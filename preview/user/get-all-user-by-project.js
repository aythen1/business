const { models } = require('../../database/connection/database')
const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')

const getAllUsersByProject = async (req, res, next) => {
  const { id } = req.params

  const project = await models.ProjectModel.findByPk(id, {
    include: [
      {
        model: models.UserModel,
        attributes: ['id', 'userName', 'email'],
        through: { attributes: ['role'] }
      }
    ]
  })

  if (!project) {
    throw new ClientError('Project not found', 404)
  }
  const users = project.UserTools

  response(res, 200, users)
}

module.exports = { getAllUsersByProject: catchedAsync(getAllUsersByProject) }
