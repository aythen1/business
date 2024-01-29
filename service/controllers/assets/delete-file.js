const {
  deleteObjectToS3
} = require('../../services/assets/object-delete')
const { catchedAsync, response } = require('../../utils/err')
// const { ClientError } = require('../../utils/err/errors')

const deleteFile = async (req, res) => {
  const { userId, path, VersionId } = req.query
  console.log('controller', { path, userId, VersionId })
  const deletedFile = await deleteObjectToS3({ userId, path, VersionId })

  console.log('controller', deletedFile)
  // if (!deletedFile) throw new ClientError('Could not found the file', 400)

  response(res, 203, deletedFile)
}

module.exports = { deleteFile: catchedAsync(deleteFile) }
