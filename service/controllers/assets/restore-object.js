const {
  checkBucketExistence
} = require('../../services/assets/check-existence-bucket-scaleway')
const {
  addBucket
} = require('../../services/assets/create-bucket-scaleway')
const {
  restoreObject
} = require('../../services/assets/restore-object')
const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')

const restoreFile = async (req, res) => {
  const { fileName, userId } = req.body

  const bucket = await checkBucketExistence(userId)
  if (!bucket) await addBucket(userId)

  const restoredFile = await restoreObject({
    fileName,
    userId
  })
  if (!restoredFile) throw new ClientError('Could not restore file', 404)

  response(res, 201, restoredFile)
}

module.exports = { restoreFile: catchedAsync(restoreFile) }
