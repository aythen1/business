const { catchedAsync, response } = require('../utils/err')
const jwt = require('jsonwebtoken')
const { ClientError } = require('../utils/err/errors')

// const crypto = require('crypto');

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



const secretKey = 'keySecret156754asdas897fav45646xz4c65z899sa4fa654fas65f4sa65sadasf';


const verifyUser = async (req, res, next) => {
  const { email } = req.body
  const user = await models.UserModel.findOne({ where: { email } })
  if (!user) {
    throw new ClientError('User not found by email', 404)
  }
  await user.update({ isVerified: true })

  await user.save()

  if (user.isVerified !== true) {
    throw new ClientError('User not verified', 404)
  } else {
    await models.WorkSpaceModel.create({
      name: `${user.userName} Workspace`,
      description: 'This is your new workspace, enjoy it'
    })
  }

  response(res, 201, { message: 'It has been successfully verified' })
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


function generateToken(username, password) {
  // Puedes incluir la información necesaria en el payload del token
  const payload = {
    username,
    password,  // Opcional: Puedes incluir la contraseña en el payload si es necesario
  };

  // Firma el token con la clave secreta y establece un tiempo de expiración (por ejemplo, 1 hora)
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
}


const tokenUser = async (req, res, next) => {
  const { email, password } = req.body
  console.log('register', email, password)

  

  response(res, 201, { message: 'It has been successfully verified' })
}




const loginUser = async (req, res, next) => {
  const { path, user, password } = req.body
  
  const data = {
    user: user,
    password: password
  }
  // const user = await models.UserModel.findOne({ where: { email } })
  // const path = `${id}/${'users'}`
  // const _user = await getVector(path, [0, 0])

  const _user = await getVector(path, 'users', [0, 0], data)

  if (_user.length == 0) {
    throw new ClientError('User not found by email', 404)
  }

  const __user = _user[0]
  // await user.update({ isVerified: true })

  // await user.save()

  if (__user.isVerified !== true) {
    throw new ClientError('User not verified', 404)
  } else {
   
  }

  response(res, 201, { message: 'It has been successfully verified' })
}


const registerUser = async (req, res, next) => {
  const { path, user, password } = req.body

  const data = [{
    user: user,
    password: password,
    isVerified: true
  }]
  // const user = await models.UserModel.findOne({ where: { email } })
  // id, name, vector = [1.3, 1.4], data, overwrite = false
  const _resp = await addVector(path, 'users', [0, 0], data, false)
  console.log('ee', _resp)
  const resp = _resp[0]
  if (!resp) {
    throw new ClientError('User not found by email', 404)
  }
  // await user.update({ isVerified: true })

  // await user.save()

  if (resp.isVerified !== true) {
    throw new ClientError('User not verified', 404)
  } else {
    console.log('send email')

    // sendEmail('info@aythen.com', 'confirm-email')

    const token = generateToken(user, password)
    console.log('t', token)
    response(res, 200, { token: token})
  }

  response(res, 201, { message: 'It has been successfully verified' })
}



const updatePasswordUser = async (req, res, next) => {
  const { email, password } = req.body
  console.log('register', email, password)

  

  response(res, 201, { message: 'It has been successfully verified' })
}






module.exports = {
  verifyUser: catchedAsync(verifyUser),
  decoderUser: catchedAsync(decoderUser),
  loginUser: catchedAsync(loginUser),
  registerUser: catchedAsync(registerUser),
  updatePasswordUser: catchedAsync(updatePasswordUser),
  tokenUser: catchedAsync(tokenUser),
}