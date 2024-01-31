const { catchedAsync, response } = require('../utils/err')
const jwt = require('jsonwebtoken')
const { ClientError } = require('../utils/err/errors')

// const crypto = require('crypto');
// const sendmail = require('sendmail')();

const {
  addVector,
  updateVector,
  getVector,
  deleteVector,
  removeVector,
} = require('../services/lancedb')


const {
  sendEmail
} = require('../services/email')


const changelogs = require('../middlewares/default/changelogs')

const news = require('../middlewares/default/news')



const ID = 'test/test'
const secretKey = 'keySecret156754asdas897fav45646xz4c65z899sa4fa654fas65f4sa65sadasf';


const encodeVector = (id) => {
  const str = `${id}`
  const base64Str = btoa(str)
  return base64Str
}


function generateToken(payload) {
  // Firma el token con la clave secreta y establece un tiempo de expiración (por ejemplo, 1 hora)
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
}


function decodeToken(token) {
  try {
    // Decodifica el token utilizando la clave secreta
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    // Maneja errores de decodificación, por ejemplo, token no válido o expirado
    console.error('Error al decodificar el token:', error.message);
    return null;
  }
}


const fetchsDefault = async (req, res, next) => {
  const { token } = req.body
  const payload = await decodeToken(token)
  const path = encodeVector(ID)


  if (!payload) {
    return res.status(501).send('Not verify user')
  }


  const respChangelogs = await getVector(path, 'changelogs')
  const respNews = await getVector(path, 'news')

  if (typeof respChangelogs == 'object' && respChangelogs.length) {
    return res.status(200).send({
      changelogs: respChangelogs,
      news: respNews
    })
  }


  const resChangelogs = await addVector(path, 'changelogs', [0, 0], changelogs)
  const resNews = await addVector(path, 'news', [0, 0], news)

  return res.status(200).send({
    changelogs: resChangelogs,
    news: resNews
  })
}






const fetchsBilling = async (req, res, next) => {
  const { token } = req.body
  console.log('billliiingg', token)
  const path = encodeVector(ID)
  const payload = await decodeToken(token)



  if (!payload) {
    return res.status(501).send('Not verify user')
  }

  // ---------------------------------------------------------
  const options = `
 query {
  users(id: ${payload.id}) {
    user
    password
    upgradedat
    createdat
    isverified
    billings(limit: 5) {
      address
      vat
      email
      limit
      paymentmethod
      upgradedat
      createdat
      tests() {
        description
      }
    }
  }
}`

  const resp = await getVector(path, options, [0, 0])


  return res.status(200).send(resp)
}



const updateBilling = async (req, res, next) => {
  const { token, billing } = req.body
  const path = encodeVector(ID)
  const payload = await decodeToken(token)

  // console.log('billliiingg', payload)


  if (!payload) {
    return res.status(501).send('Not verify user')
  }


  const resp = await addVector(path, 'billings', [0, 0], billing, { users: payload })

  var data = {
    title: 'title',
    description: 'description',
  }
  const _resp = await addVector(path, 'tests', [0, 0], data, { users: payload, billings: resp[0] })

  console.log('resp', resp)
  console.log('_resp', _resp)


  return res.status(200).send(resp)
}






const verifyUser = async (req, res, next) => {
  const { token } = req.body
  const payload = await decodeToken(token)

  // console.log('uuuuu', payload)
  if (!payload) {
    return res.status(501).send('Not verify user')
  }

  const data = {
    id: payload.id,
    isverified: true
  }

  // const user = await models.UserModel.findOne({ where: { email } })
  // id, name, vector = [1.3, 1.4], data, overwrite = false
  const path = encodeVector(ID)
  // console.log('data', data)

  const resp = await updateVector(path, 'users', [0, 0], data, false)

  const _token = generateToken(resp)
  // console.log('rok', _token)
  if (resp.isverified) {
    response(res, 200, { user: resp, token: _token })
  } else {
    response(res, 201, { message: 500 })
  }
}



const avatarUser = async (req, res) => {
  const { id } = req.params
  const path = encodeVector(ID)

  const options = `
    query {
     users(id: ${id}) {
       avatar
   }`

  const resp = await getVector(path, options, [0, 0])

  if (!resp.avatar) {
    throw 'Not exist user'
  }

  const base64Image = resp.avatar

  // Verifica si el dato es válido antes de enviarlo
  if (!base64Image || !/^data:image\/\w+;base64,/.test(base64Image)) {
    res.status(400).send('Formato de imagen no válido');
    return;
  }

  // Extrae el tipo de contenido de la imagen (png, jpeg, etc.)
  const contentType = base64Image.split(';')[0].split(':')[1];

  // Convierte el formato base64 a Buffer
  const imageBuffer = Buffer.from(base64Image.split(',')[1], 'base64');

  // Establece las cabeceras de la respuesta con el tipo de contenido
  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': imageBuffer.length,
  });

  // Envía la imagen en formato Buffer como respuesta
  res.end(imageBuffer);
}




const updateUser = async (req, res, next) => {
  const { token, user } = req.body

  const payload = await decodeToken(token)

  if (!payload) {
    return res.status(501).send('Not access granted')
  }

  user.id = payload.id

  // const user = await models.UserModel.findOne({ where: { email } })
  // id, name, vector = [1.3, 1.4], data, overwrite = false
  const path = encodeVector(ID)

  const resp = await updateVector(path, 'users', [0, 0], user, false)

  const _token = await generateToken(resp)

  if (resp.isverified) {
    response(res, 200, { user: resp, token: _token })
  } else {
    response(res, 201, { message: 500 })
  }
}


const decoderUser = async (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    throw new ClientError('Token not provided', 401)
  }
  const decodedToken = jwt.verify(
    token,
    'keySecret156754asdas897fav45646xz4c65z899sa4fa654fas65f4sa65sadasf'
  )
  const userEmail = decodedToken.email
  const user = await models.UserModel.findOne({
    where: { email: userEmail }
  })
  if (!user) {
    throw new ClientError('User not found', 404)
  }
  response(res, 200, user)
}





const tokenUser = async (req, res, next) => {
  const { token } = req.params
  console.log('register token', token)



  response(res, 201, { data: 'It has been successfully verified' })
}




const loginUser = async (req, res, next) => {
  const { path, user, password } = req.body

  const options = [
    { field: 'user', operator: '==', value: user }
  ];


  const _user = await getVector(path, 'users', [0, 0], options)

  if (_user.error) {
    // throw new ClientError(_user.error, 500)
    response(res, 500, { message: _user.error })
  }

  if (_user.length == 0) {
    // throw new ClientError('User not found by email', 404)
    response(res, 500, { message: 'User not found by email' })
  }

  const data = _user[0]


  if (data.isverified !== true) {
    throw new ClientError('User not verified', 404)
  } else {
    response(res, 200, {
      token: generateToken(data),
      user: data
    })
  }

}



const registerUser = async (req, res, next) => {
  const { path, user, password } = req.body

  const conditions = [
    { field: 'user', operator: '==', value: user }
  ];


  // const user = await models.UserModel.findOne({ where: { email } })
  // id, name, vector = [1.3, 1.4], data, overwrite = false
  const resp = await getVector(path, 'users', [0, 0], conditions, false)

  console.log('register1', resp)
  if (resp.length > 0) {
    // throw new ClientError('User ya existe ' + JSON.stringify(resp.exist), 400)
    return res.status(400).send('User already exist')
  }

  if (resp.error) {
    throw new ClientError(resp.error, 500)
  }

  const data = {
    user: user,
    password: password,
    isverified: false,
    upgradedat: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString()
  }

  const _resp = await addVector(path, 'users', [0, 0], data, false)

  const token = generateToken(_resp[0])

  const email = sendEmail('info@aythen.com', 'confirm-email', { token })

  response(res, 200, { token: 'Success' })
}



const upgradeUser = async (req, res, next) => {
  const { token, upgradedat } = req.body
  const path = encodeVector(ID)


  const result = await isAuth(token)
  console.log('upgrade', token, result, upgradedat)
  if (!result) {
    return res.status(501).send(arr)
  } else {
    const data = {
      id: result.id,
      upgradedat: upgradedat
    }

    console.log('wwdc', data)

    const _resp = await updateVector(path, 'users', [0, 0], data, false)
    console.log('rr', _resp)

    const email = sendEmail('info@aythen.com', 'start-premium')

    response(res, 200, {
      token: generateToken(_resp),
      user: _resp
    })

  }

}




const recoverPasswordUser = async (req, res, next) => {
  const { path, email } = req.body
  console.log('register', email, path)


  const options = [
    { field: 'user', operator: '==', value: email }
  ];


  const resp = await getVector(path, 'users', [0, 0], options, false)
  console.log('===========', resp, resp.length)

  if (resp.error) {
    throw new ClientError(resp.error, 500)
  }

  if (resp.length == 0) {
    console.log('wfrf')
    // throw new ClientError(resp.error, 500)

    return res.status(400).send({ message: 'Not found user' })
  }
  console.log('aaaa')

  const user = resp[0]

  const token = generateToken(user)

  sendEmail('info@aythen.com', 'recover-password', { token })
  response(res, 200, { message: 'Send Email' })

}



const updatePasswordUser = async (req, res, next) => {
  const { token, password } = req.body
  console.log('update password', token, password)

  const _token = decodeToken(token)

  let user = _token.user
  user.password = password

  console.log('_token', user)

  const path = encodeVector(ID)

  const resp = await updateVector(path, 'users', [0, 0], user, false)

  const __token = generateToken(resp)

  console.log('resp', resp)

  response(res, 200, {
    user: resp,
    token: __token
  })
}




// --------------------------------------

const isAuth = async (token) => {
  const data = await decodeToken(token)
  const path = encodeVector(ID)

  const options = [
    { field: 'id', operator: '==', value: data.id },
    { field: 'user', operator: '==', value: data.user },
    { field: 'isverified', operator: '==', value: true }
  ];

  const resp = await getVector(path, 'users', [0, 0], options)

  if (resp.length > 0) return resp[0]
  return false
}

const addUser = async (req, res) => {
  const { token, user, tags, group } = req.body

  const result = await isAuth(token)

  const arr = []
  const path = encodeVector(ID)

  if (!result) {
    return res.status(501).send(arr)
  } else {
    for (var i = 0; i < user.length; i++) {
      let data = {
        user: user[i],
        password: '1234',
        isverified: true
      }

      const resp = await addVector(path, 'users', [0, 0], data, false)
      console.log('re', resp)
      arr.push(resp)
    }
  }

  return res.status(200).send(arr)
}



const deleteUser = async (req, res) => {
  const { token, id } = req.body

  const result = await isAuth(token)
  const path = encodeVector(ID)

  if (!result) {
    return res.status(501).send(arr)
  } else {
    console.log('ed9iew2udh', id)
    const resp = await deleteVector(path, 'users', id)

    console.log('resp', resp)
  }

  return res.status(200).send(id)
}




const fetchsUser = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  const result = await isAuth(token)
  const path = encodeVector(ID)


  if (result) {
    const data = await getVector(path, 'users')
    return res.status(200).send(data)
  } else {
    return res.status(500).send(data)
  }

}







const addApplication = async (req, res) => {
  try{
    const { token, application } = req.body
  
    const result = await isAuth(token)
    const path = encodeVector(ID)
  
    if (!result) {
      return res.status(501).send(arr)
    } else {
  
      console.log('apps', result, application)
      const resp = await addVector(path, 'applications', [0, 0], application, {users: result})
      console.log('re', resp)
      return res.status(200).send(resp)
  
    }
  }catch(err){
    console.log('Error ', err)
  }

}



const deleteApplication = async (req, res) => {
  const { token, id } = req.body

  const result = await isAuth(token)
  const path = encodeVector(ID)

  if (!result) {
    return res.status(501).send(arr)
  } else {
    const resp = await deleteVector(path, 'applications', id)

    console.log('resp', resp)
  }

  return res.status(200).send(id)
}




const fetchsApplication = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const result = await isAuth(token)
    
    if (result) {
      const path = encodeVector(ID)

      const data = await getVector(path, 'applications')
      return res.status(200).send(data)
    } else {
      return res.status(200).send([])
    }

  } catch (err) {
    return res.status(200).send([])
  }


}








const addPolice = async (req, res) => {
  try{
    const { token, police } = req.body
  
    console.log('eee', police)
    const result = await isAuth(token)
    const path = encodeVector(ID)
  
    if (result) {
      const resp = await addVector(path, 'polices', [0, 0], police, {users: result})
      return res.status(200).send(resp)
    } else {
      return res.status(501).send(arr)

    }
  }catch(err){

  }

}



const deletePolice = async (req, res) => {
  const { token, id } = req.body

  const result = await isAuth(token)
  const path = encodeVector(ID)

  if (!result) {
    return res.status(501).send(arr)
  } else {
    const resp = await deleteVector(path, 'polices', id)

    console.log('resp', resp)
  }

  return res.status(200).send(id)
}




const fetchsPolice = async (req, res) => {
  try{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    const result = await isAuth(token)
    const path = encodeVector(ID)
  
    if (result) {
      const data = await getVector(path, 'polices')
      if (Array.isArray(data)) {
        return res.status(200).send(data)
      }
    }else{
      return res.status(200).send([])
    }
  }catch(err){
    return res.status(200).send([])
  }


}






const addApi = async (req, res) => {
  const { token, api } = req.body

  console.log('eee', api)
  const result = await isAuth(token)
  const path = encodeVector(ID)

  if (!result) {
    return res.status(501).send(arr)
  } else {

    const resp = await addVector(path, 'apis', [0, 0], api, false)
    console.log('re', resp)
    return res.status(200).send(resp)

  }

}



const deleteApi = async (req, res) => {
  const { token, id } = req.body

  const result = await isAuth(token)
  const path = encodeVector(ID)

  if (!result) {
    return res.status(501).send(arr)
  } else {
    const resp = await deleteVector(path, 'apis', id)

    console.log('resp', resp)
  }

  return res.status(200).send(id)
}




const fetchsApi = async (req, res) => {
  try{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    const result = await isAuth(token)
    const path = encodeVector(ID)
  
  
    if (result) {
      const data = await getVector(path, 'apis')
      if (Array.isArray(data)) {
        return res.status(200).send(data)
      }else{
        return res.status(200).send([])
      }
    }

  }catch(err){
    return res.status(200).send([])
  }

}



const addLog = async (req, res) => {
  try{

  }catch(err){
    
  }
  const { token, log } = req.body

  const result = await isAuth(token)
  const path = encodeVector(ID)

  if (!result) {
    return res.status(501).send(arr)
  } else {

    const resp = await addVector(path, 'logs', [0, 0], log, false)
    return res.status(200).send(resp)

  }

}



const deleteLog = async (req, res) => {
  const { token, id } = req.body

  const result = await isAuth(token)
  const path = encodeVector(ID)

  if (!result) {
    return res.status(501).send(arr)
  } else {
    const resp = await deleteVector(path, 'logs', id)

    console.log('resp', resp)
  }

  return res.status(200).send(id)
}




const fetchsLog = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  const result = await isAuth(token)
  const path = encodeVector(ID)


  if (result) {
    const data = await getVector(path, 'logs')
    if (Array.isArray(data)) {
      return res.status(200).send(data)
    }
  }

  return res.status(200).send([])
}



module.exports = {
  fetchsDefault: catchedAsync(fetchsDefault),

  fetchsBilling: catchedAsync(fetchsBilling),
  updateBilling: catchedAsync(updateBilling),

  verifyUser: catchedAsync(verifyUser),
  decoderUser: catchedAsync(decoderUser),
  loginUser: catchedAsync(loginUser),
  registerUser: catchedAsync(registerUser),
  upgradeUser: catchedAsync(upgradeUser),
  avatarUser: catchedAsync(avatarUser),
  updateUser: catchedAsync(updateUser),
  recoverPasswordUser: catchedAsync(recoverPasswordUser),
  updatePasswordUser: catchedAsync(updatePasswordUser),


  addUser: catchedAsync(addUser),
  deleteUser: catchedAsync(deleteUser),
  fetchsUser: catchedAsync(fetchsUser),

  addApplication: catchedAsync(addApplication),
  deleteApplication: catchedAsync(deleteApplication),
  fetchsApplication: catchedAsync(fetchsApplication),

  addPolice: catchedAsync(addPolice),
  deletePolice: catchedAsync(deletePolice),
  fetchsPolice: catchedAsync(fetchsPolice),

  addApi: catchedAsync(addApi),
  deleteApi: catchedAsync(deleteApi),
  fetchsApi: catchedAsync(fetchsApi),


  addLog: catchedAsync(addLog),
  deleteLog: catchedAsync(deleteLog),
  fetchsLog: catchedAsync(fetchsLog),
}