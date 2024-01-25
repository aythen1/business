const { models } = require('../../database/connection/database')
const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')

const getAllUsers = async (req, res, next) => {
  const { query } = req
  const where = { isDeleted: false }

  if (Object.keys(query).length > 0) {
    for (const prop in query) {
      where[prop] = query[prop]
    }
  }
  const users = await models.UserModel.findAll({ where })
  if (!users.length) throw new ClientError('Error al traer los users', 400)
  response(res, 200, users)
}

module.exports = { getAllUsers: catchedAsync(getAllUsers) }
