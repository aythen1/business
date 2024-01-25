const { models } = require('../../database/connection/database')
// const bcrypt = require('bcrypt')
const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')
const jwt = require('jsonwebtoken')
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

module.exports = { decoderUser: catchedAsync(decoderUser) }
