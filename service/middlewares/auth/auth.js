const jwt = require('jsonwebtoken')
const { models } = require('../../database/connection/database')
const { catchedAsync } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    throw new ClientError('Authorization token missing', 401)
  }

  try {
    const decodedToken = jwt.verify(
      token,
      'keySecret156754asdas897fav45646xz4c65z899sa4fa654fas65f4sa65sadasf'
    )
    const user = await models.UserModel.findByPk(decodedToken.userId)

    if (!user) {
      throw new ClientError('User not found', 404)
    }

    req.user = user
    next()
  } catch (error) {
    throw new ClientError('Invalid token', 401)
  }
}

module.exports = { authenticateToken: catchedAsync(authenticateToken) }
