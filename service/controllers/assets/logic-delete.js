const {
  checkBucketExistence
} = require('../../services/assets/check-existence-bucket-scaleway')
const {
  addBucket
} = require('../../services/assets/create-bucket-scaleway')
const {
  getObjectS3
} = require('../../services/assets/object-get-data')
const { putObject } = require('../../services/assets/put-object')
const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')

const logicDelete = async (req, res) => {
  const { StorageClass, fileName, userId } = req.body

  const bucket = await checkBucketExistence(userId)
  if (!bucket) await addBucket(userId)

  const data = await getObjectS3({ userId, fileName })
  if (!data) throw new ClientError('Could not find file', 404)

  console.log('Body', data)
  const updatedObject = await putObject({
    fileName,
    userId,
    StorageClass,
    Body: data.Body
  })
  console.log({ updatedObject })

  response(res, 201, updatedObject)
}

module.exports = { logicDelete: catchedAsync(logicDelete) }
