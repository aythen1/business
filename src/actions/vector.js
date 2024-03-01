import apiBackend from '@/utils/apiBackend.js'
import { createAsyncThunk } from '@reduxjs/toolkit';




export const calculateTimeAgo = (timestamp) => {
  const currentTime = new Date()
  const previousTime = new Date(timestamp)
  const timeDifference = currentTime - previousTime

  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return `${seconds} seconds ago`
  } else if (minutes < 60) {
    return `${minutes} minutes ago`
  } else if (hours < 24) {
    return `${hours} hours ago`
  } else {
    return `${days} days ago`
  }
}

// Codificar el objeto a Base64
const encodeVector = (obj) => {
  var str = `${obj.workspaceId}/${obj.projectId}`

  if(obj.path) str += `/${obj.path}`

  const base64Str = btoa(str)
  return base64Str
}

// Decodificar la cadena Base64 a objeto
export const decodeVector = (base64Str) => {
  const str = atob(base64Str)

  const [workspaceId, projectId] = str.split('/')
  return { workspaceId, projectId }
}

//
export const iniVector = (obj) => {
  return encodeVector(obj)
}



// -------------------------------------------------------------------



export const openVector = 
createAsyncThunk('vector/openVector',
async ({path}) => {
  try {
    const token = localStorage.getItem('token')
    const res = await apiBackend.post(
      '/vector/file',
      {
        token,
        path
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }
    )

    const file = JSON.parse(res.data.data.data[0].data)


    // // Supongamos que buffer contiene los datos del archivo test.eps

    // Convertir el buffer a Blob
    const blob = new Blob([file.buffer.data], { type: file.mimetype })

    // Crear un enlace de descarga
    const downloadLink = document.createElement('a')
    downloadLink.href = URL.createObjectURL(blob)
    downloadLink.download = file.originalname

    // Agregar el enlace al cuerpo del documento (invisible)
    downloadLink.style.display = 'none'
    document.body.appendChild(downloadLink)

    // Simular clic en el enlace para iniciar la descarga
    downloadLink.click()

    // Eliminar el enlace después de la descarga
    document.body.removeChild(downloadLink)

    return 200
  } catch (error) {
    console.error('Error:', error)
  }
})


export const openFile = 
createAsyncThunk('vector/openFile', async ({data}) => {
  try {
    const token = localStorage.getItem('token')
    const res = await apiBackend.post(
      '/vector/file',
      {
        path: data.uri,
        vector: data.vector
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }
    )

    const { type, data:base64Contente } = res.data.data.data[0]

    if(type == 'application/sheet'){

      return base64Contente
    }

    const dataURI = `data:${type};base64,${base64Content}`;

    // const file = JSON.parse(res.data.data.data[0].data)
    // console.log('ffdddd   ddddd', file)

    // const blob = new Blob([file.buffer.data], { type: file.mimetype })
    // const href = URL.createObjectURL(blob)
    // console.log('rr', href)

    return dataURI
  } catch (error) {
    console.error('Error:', error)
  }

})


export const loadVector = 
createAsyncThunk('vector/loadVector',
async ({id, name, file}) => {
  try {
    const token = localStorage.getItem('token')
    // console.log('loadVector', vectorId, name, file)
    const res = await apiBackend.post(
      `/vector/load/${id}/${name}`,
      {
        file,
        vector: [2, 2]
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }
    )

    return {
      uri: res.data.data.uri,
      vector: res.data.data.vector
    }

  } catch (error) {
    console.error('Error:', error)
  }
})


export const addVector = 
createAsyncThunk('vector/addVector',
async ({id, name, data}) => {
  try {
    const token = localStorage.getItem('token')
    console.log('dd', data)
    const res = await apiBackend.post(
      '/vector/',
      {
        id,
        name,
        data
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }
    )

    console.log('resspso', res)
    
    return res.data[0]
  } catch (error) {
    console.error('Error:', error)
  }
})




export const addVectorData = 
createAsyncThunk('vector/addVectorData',
async ({id, title, data, vector}) => {
  try {
    const token = localStorage.getItem('token')
    console.log('dd', data)
    const res = await apiBackend.post(
      '/vector/data',
      {
        id, 
        title,
        data,
        vector
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }
    )

    console.log('rrreaddVectorData', res)
    return res.data[0]
  } catch (error) {
    console.error('Error:', error)
  }
})






export const updateVector = 
createAsyncThunk('vector/updateVector',
async ({id, name, data}) => {
  try {
    const token = localStorage.getItem('token')
    const res = await apiBackend.post(
      `/vector/update/${id}/${name}`,
      {
        data
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }
    )

    console.log('res update', res)

    return res.data
  } catch (error) {
    console.error('Error:', error)
  }
})


export const deleteVector = 
createAsyncThunk('vector/deleteVector',
async ({id, name, data}) => {
  try {
    const token = localStorage.getItem('token')

    console.log('delete vector', data)
    const res = await apiBackend.delete(
      `/vector/${id}/${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          data
        }
      }
    )
    
    console.log('dd', res)
    return res.data
  } catch (error) {
    console.error('Error:', error)
  }
})


export const removeAllVector = 
createAsyncThunk('vector/removeAllVector',
async ({path}) => {
  try {
    // console.log('wfiri', pathName)
    const token = localStorage.getItem('token')
    const res = await apiBackend.post(
      `/vector/remove/all`,
      {
        path
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }
    )
    console.log('dd', res)
    return res.data.data.slice(0, 4)
  } catch (error) {
    console.error('Error:', error)
  }
})


export const fetchsVector = 
createAsyncThunk('vector/fetchsVector',
async ({id, name, data = false}) => {
  try {
    const token = localStorage.getItem('token')

     const res = await apiBackend.post(
      `/vector/${id}/${name}`,{
        data
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }
    )

    console.log('res fetchs', res)

    return res.data
  } catch (error) {
    console.error('Error:', error)
  }
})



export const fetchVector = 
createAsyncThunk('vector/fetchVector',
async ({id, name, data = false}) => {
  try {
    const token = localStorage.getItem('token')

     const res = await apiBackend.post(
      `/vector/${id}/${name}`,{
        data
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }
    )

    console.log('res fetchHHHH', res)

    return res.data
  } catch (error) {
    console.error('Error:', error)
  }
})





export const getAllVector = 
createAsyncThunk('vector/getAllVector',
async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await apiBackend.get('/vector', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
    })
    // console.log('dd', res.data.data.data)
    return res.data.data.data.slice(0, 4)
  } catch (error) {
    console.error('Error:', error)
  }
})














































































// ----------------------------------------


export const detectDrop = (file) => {
  if (file.type.startsWith('video/vnd.dlna.mpeg-tts')) {
    // setVideoFile(video)
    console.log('ts', file.type)
    return 'video/vnd.dlna.mpeg-tts'
  } else if (file.type.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    // setVideoFile(video)
    console.log('application/sheet', file.type)
    return 'application/sheet'
  } else if (file.type.startsWith('text/javascript')) {
    // setVideoFile(video)
    console.log('js', file.type)
    return 'text/javascript'
  } else if (file.type.startsWith('text/css')) {
    // setVideoFile(video)
    console.log('js', file.type)
    return 'text/css'
  } else if (file.type.startsWith('text/html')) {
    console.log('html', file.type)
    return 'text/html'
  } else if (file.type.startsWith('video/')) {
    // setVideoFile(video)
    console.log('video', file.type)
    return file.type
  } else if (file.type.startsWith('image/')) {
    console.log('image', file.type)
    return file.type
  } else if (file.type.startsWith('application/x-zip-compressed')) {
    console.log('zip', file.type)
    return 'application/x-zip-compressed'
  } else if (file.type.startsWith('application/pdf')) {
    console.log('pdf', file.type)
    return 'application/pdf'
  } else if (file.type.startsWith('text/plain')) {
    console.log('text', file.type)
    return 'text/plain'
  } else if (file.type.startsWith('audio/mpeg')) {
    console.log('mp3', file.type)
    return 'audio/mpeg'
  } else if (file.type.startsWith('application/json')) {
    console.log('json', file.type)
    return 'application/json'
  } else if (file.type.startsWith('application/postscript')) {
    console.log('ai', file.type)
    return 'application/postscript'
  } else {
    const fileExtension = file.name.split('.').pop()

    switch (fileExtension.toLowerCase()) {
      case 'jsx':
        console.log('jsx', file.type)
        return 'text/jsx'
      case 'md':
        console.log('md', file.type)
        return 'text/md'
    }
  }
}

export const detectBot = async (value, type) => {
  let response


  const allowDrop = [
    'video/vnd.dlna.mpeg-tts',
    'text/javascript',
    'text/css',
    'text/html',
    'application/x-zip-compressed',
    'application/pdf',
    'text/plain',
    'audio/mpeg',
    'application/json',
    'application/postscript',
    'text/jsx',
    'text/md',
    'video/mp4',
    'image/png',
    // premium
    'record'
  ]

  console.log('tyyype', type)

  const target = allowDrop.includes(type)
  // console.log('target,', target)
  if (target) {
    switch (type) {
      case 'record':
        response = {
          currentDate: new Date(),
          message: value.uri,
          data: JSON.stringify(value.volumeArray),
          type
        }
        break
      default:

      console.log('blooob', value)
        // const blobInfo = await blobToFileObject(value.data);

        response = {
          currentDate: new Date(),
          message: value.uri,
          data: JSON.stringify(value),
          type
          // document: 'droppedFile', // texto | image |
        }
    }

  } else {
    // Define el regex para capturar el camel-case después de @
    const regex = /@([a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)/
    const match = value.match(regex)

    if (match) {

      // Switch basado en el camel-case
      const camelCase = match[1]
      switch (camelCase) {
        case 'bot':
        case 'help':
          response = { currentDate: new Date(), message: value, type: 'bot' }
          break
        case 'text':
          response = { currentDate: new Date(), message: value, type: 'text' }
          break
        default:
          if (camelCase.startsWith('edit-')) {
            value = {
              flag: camelCase,
              component: 'component de prueba test A1'
            }
            response = {
              currentDate: new Date(),
              message: value,
              type: `edit/${camelCase.slice(5)}`
            }
          } else {
            response = { currentDate: new Date(), message: value, type }
          }
      }
    } else {
      // No se encontró un patrón @[camel-case]
      response = { currentDate: new Date(), message: value, type: 'text' }
    }
  }

  return response
}
