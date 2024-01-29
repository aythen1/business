const {
  deleteS3Folder
} = require('../../services/assets/delete-folder-bucket')
const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')

const deleteFolder = async (req, res) => {
  const { userId, path } = req.query
  console.log({ userId, path })
  const deletedFolder = await deleteS3Folder(userId, path)
  if (!deletedFolder) throw new ClientError('Could not delete the folder', 400)

  response(res, 203, deletedFolder)
}

module.exports = { deleteFolder: catchedAsync(deleteFolder) }
