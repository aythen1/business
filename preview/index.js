const app = require('./app')
const { YSocketIO } = require('y-socket.io/dist/server')
// const cors = require('cors')

const port = 4000

const { frontUrl } = require('./config')

// const setupWSConnection = require('y-websocket/bin/utils').setupWSConnection

const server = require('http').createServer(app)

// ==================
console.log('frontUrl', frontUrl)
const express = require('express')
// const io = require('socket.io')(server)
const io = require('socket.io')(server, {
  cors: {
    origin: frontUrl,
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
})

const ysocketio = new YSocketIO(io)

ysocketio.initialize()

const path = require('path')

const socketList = {}

app.use(express.static(path.join(__dirname, 'public')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })
}

app.get('/ping', (req, res) => {
  res
    .send({
      success: true
    })
    .status(200)
})

io.on('connection', (socket) => {
  console.log(`New User connected: ${socket.id}`)

  // socket.onAny((eventName, ...args) => {
  //   // console.log(`Socket event: ${eventName}`, args)
  // })

  socket.on('disconnect', () => {
    console.log('User disconnected!', socket.id)
    if (socketList[socket.id]) {
      delete socketList[socket.id]
    }
  })

  // socket.on('save-version', ({ roomId, versionData }) => {
  //   // Simplemente almacenar la versión en un objeto (debes adaptarlo a tu lógica)
  //   if (!versionData[roomId]) {
  //     versionData[roomId] = []
  //   }

  //   versionData[roomId].push(versionData)

  //   // Aquí puedes agregar lógica para guardar la versión en una base de datos, archivo, etc.
  //   // Ejemplo: saveVersionToDatabase(roomId, versionData);
  // })

  socket.on('BE-check-user', async ({ roomId, userName }) => {
    console.log('on BE-check-user, roomId: ', roomId, 'userName: ', userName)
    let error = false

    try {
      const sockets = await io.in(roomId).allSockets()
      for (const clientSocketId of sockets) {
        const clientSocket = io.sockets.sockets.get(clientSocketId)
        if (clientSocket && socketList[clientSocket.id] === userName) {
          error = true
          break
        }
      }

      if (!error) {
        socket.emit('BE-join-room', { roomId, userName })
      } else {
        console.log('User name already exists')
      }
    } catch (err) {
      console.error('Error in checking user:', err)
    }
  })

  socket.on('BE-join-room', ({ roomId, userName }) => {
    console.log('on BE-join-room, roomId: ', roomId, 'userName: ', userName)
    socket.join(roomId)
    socketList[socket.id] = { userName, video: true, audio: true }

    io.of('/')
      .in(roomId)
      .allSockets()
      .then((sockets) => {
        const users = []
        sockets.forEach((clientSocketId) => {
          users.push({
            userId: clientSocketId,
            info: socketList[clientSocketId]
          })
        })
        console.log('users from BE-join-room: ', users)
        socket.to(roomId).emit('FE-user-join', users)
      })
      .catch((err) => {
        console.error(err)
        socket.emit('FE-error-user-exist', { err: true })
      })
  })

  socket.on('BE-leave-room', ({ roomId, leaver }) => {
    console.log(
      'on BE-leave-room, roomId: ',
      roomId,
      'leaver userName: ',
      leaver
    )
    delete socketList[socket.id]
    socket
      .to(roomId)
      .emit('FE-user-leave', { userId: socket.id, userName: [socket.id] })
    socket.leave(roomId)
  })

  socket.on('BE-call-user', ({ userToCall, from, signal }) => {
    io.to(userToCall).emit('FE-receive-call', {
      signal,
      from,
      info: socketList[socket.id]
    })
  })

  socket.on('BE-accept-call', ({ signal, to }) => {
    io.to(to).emit('FE-call-accepted', {
      signal,
      answerId: socket.id
    })
  })

  socket.on('toggleVideo', ({ userId, roomId }) => {
    if (socketList[userId]) {
      socketList[userId].video = !socketList[userId].video
      socket
        .to(roomId)
        .emit('FE-toggle-camera', { userId, switchTarget: 'video' })
    }
  })

  socket.on('mute', ({ userId, roomId }) => {
    if (socketList[userId]) {
      socketList[userId].audio = !socketList[userId].audio
      socket
        .to(roomId)
        .emit('FE-toggle-camera', { userId, switchTarget: 'audio' })
    }
  })

  socket.on('BE-test', ({ res }) => console.log('res from BE-test: ', res))

  socket.on('BE-toggle-camera-audio', ({ roomId, switchTarget }) => {
    if (switchTarget === 'video') {
      socketList[socket.id].video = !socketList[socket.id].video
    } else {
      socketList[socket.id].audio = !socketList[socket.id].audio
    }
    socket
      .to(roomId)
      .emit('FE-toggle-camera', { userId: socket.id, switchTarget })
  })
})

// ==================

// const WebSocket = require('ws')
// // const { username } = require('./config')

// const wss = new WebSocket.Server({ server })

// wss.on('connection', setupWSConnection)

server.listen(port, () => {
  console.log(`Server is up on ${port}`)
})
