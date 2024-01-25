const { models } = require('../../database/connection/database')
const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')

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

module.exports = { verifyUser: catchedAsync(verifyUser) }
