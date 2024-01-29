const {
  checkBucketExistence
} = require('../../services/assets/check-existence-bucket-scaleway')
const {
  addBucket
} = require('../../services/assets/create-bucket-scaleway')
const {
  createFolder
} = require('../../services/assets/create-folder-bucket')
const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')

const addFolder = async (req, res) => {
  const { userId, name } = req.body

  const bucket = await checkBucketExistence(userId)
  if (!bucket) await addBucket(userId)

  const newFolder = await createFolder(name, userId)

  if (!newFolder) throw new ClientError('Could not create the folder', 400)

  response(res, 203, newFolder)
}

module.exports = { addFolder: catchedAsync(addFolder) }
