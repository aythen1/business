const { models } = require('../../database/connection/database')
const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')
const bcrypt = require('bcrypt')

const updatePassword = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) throw new ClientError('Information is missing', 404)

  const user = await models.UserModel.findOne({ where: { email } })

  if (!user) {
    throw new ClientError('User Not Found', 404)
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await user.update({ password: hashedPassword })

  await user.save()

  response(res, 201, { message: 'Password changed success', user })
}

module.exports = { updatePassword: catchedAsync(updatePassword) }
