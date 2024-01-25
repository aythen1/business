const { models } = require('../../database/connection/database')
const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')

const getAllFreelancer = async (req, res, next) => {
  const allFreelancer = await models.UserModel.findAll({
    where: {
      isFreelancer: true
    }
  })

  if (!allFreelancer) {
    throw new ClientError('Project not found', 404)
  }

  response(res, 200, allFreelancer)
}

module.exports = { getAllFreelancer: catchedAsync(getAllFreelancer) }
