const {
  checkBucketExistence
} = require('../../services/assets/check-existence-bucket-scaleway')
const {
  renameS3Folder
} = require('../../services/assets/modify-name-folder')
const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')

const changeFolderName = async (req, res) => {
  const { userId, oldPath, newPath } = req.body

  const bucket = await checkBucketExistence(userId)
  if (!bucket) throw new ClientError('The folder does not exist', 403)

  const newFolderName = await renameS3Folder({
    bucketName: userId,
    oldFolderPath: oldPath,
    newFolderPath: newPath
  })

  if (!newFolderName) throw new ClientError('Could not create the folder', 400)

  response(res, 203, newFolderName)
}

module.exports = { changeFolderName: catchedAsync(changeFolderName) }
