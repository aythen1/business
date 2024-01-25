const { models } = require('../../database/connection/database')
const bcrypt = require('bcrypt')
const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')
// const addPage = require('../page/add-page')
const { addPresetRelations } = require('../../utils/helpers/addPresetRelations')

const addUser = async (req, res, next) => {
  const {
    userName,
    email,
    password,
    plan,
    resourcesList,
    theme,
    billingDates,
    isFreelancer
  } = req.body
  const userByEmail = await models.UserModel.findOne({
    where: { email }
  })
  if (userByEmail) {
    throw new ClientError('Email already exists', 400)
  }

  const userByUserName = await models.UserModel.findOne({
    where: { userName }
  })

  if (userByUserName) {
    throw new ClientError('Username already exists', 400)
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await models.UserModel.create({
    userName,
    email,
    password: hashedPassword,
    plan,
    resourcesList,
    theme,
    billingDates,
    isFreelancer
  })

  const workspace = await models.WorkSpaceModel.create({
    name: `Workspace for ${userName}`,
    description: `Workspace for ${userName}`
  })

  await models.UserWorkSpaceModel.create({
    userId: user.id,
    workSpaceId: workspace.id,
    role: 'Owner'
  })

  const newProject = await models.ProjectModel.create({
    name: `Project for ${userName}`,
    workSpaceId: workspace.id
  })

  await models.UserProjectModel.create({
    userId: user.id,
    projectId: newProject.id,
    role: 'Owner'
  })

  const newPreset = await models.PresetModel.create({
    name: 'newPreset',
    ProjectId: newProject.dataValues.id,
    UserToolId: user.dataValues.id
  })

  await addPresetRelations(newPreset.id)

  // const space = await models.SpaceModel.create({
  //   name: `Space for ${userName}`,
  //   description: `Space for ${userName}`,
  //   projectId: newProject.id
  // })

  // const page = await addPage({ req: newProject.id, spaceId: space.id, res })

  response(res, 200, user)
}

module.exports = { addUser: catchedAsync(addUser) }
