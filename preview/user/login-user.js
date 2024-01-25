const { compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')
const { models } = require('../../database/connection/database')
const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')

const loginUser = async (req, res, next) => {
  const { email, password, remember } = req.body

  const user = await models.UserModel.findOne({ where: { email } })

  if (!user) {
    throw new ClientError('User Not Found', 404)
  }

  // if (user.isVerified !== true) {
  //  throw new ClientError('Email not verified', 404)
  // }

  // console.log(password,user.password);
  const passwordIsValid = compareSync(password, user.password)

  if (!passwordIsValid) {
    throw new ClientError('Invalid Credentials', 401)
  }

  const payload = {
    userId: user.id,
    email: user.email
  }

  let expiresIn = '3 days'

  if (remember === true) {
    expiresIn = '7 days'
  }

  const token = jwt.sign(
    payload,
    'keySecret156754asdas897fav45646xz4c65z899sa4fa654fas65f4sa65sadasf',
    { expiresIn }
  )

  response(res, 200, { token, user })
}

module.exports = { loginUser: catchedAsync(loginUser) }
