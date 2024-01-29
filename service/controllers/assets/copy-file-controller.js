const {
  copyImageToAnotherBucket
} = require('../../services/assets/copy-image-bucket')
const {
  checkBucketExistence
} = require('../../services/assets/check-existence-bucket-scaleway')
const {
  addBucket
} = require('../../services/assets/create-bucket-scaleway')
const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')

const copyFile = async (req, res) => {
  console.log('COPY FILEEE')
  const { sourceBucket, sourceKey, destinationBucket, destinationKey, userId } =
    req.body

  const bucket = await checkBucketExistence(userId)
  if (!bucket) await addBucket(userId)
  console.log({
    sourceBucket,
    sourceKey,
    destinationBucket,
    destinationKey,
    userId
  })
  const newFile = await copyImageToAnotherBucket(
    sourceBucket,
    sourceKey,
    destinationBucket,
    destinationKey
  )

  if (!newFile) throw new ClientError('Could not copy the file', 404)

  response(res, 201, newFile)
}

module.exports = { copyFile: catchedAsync(copyFile) }
