const {
  addScalewayImage
} = require('../../services/assets/add-image-scaleway')
const {
  checkBucketExistence
} = require('../../services/assets/check-existence-bucket-scaleway')
const {
  addBucket
} = require('../../services/assets/create-bucket-scaleway')
const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')

const addGenericImage = async (req, res) => {
  const { userId, path } = req.body
  const image = req.file

  const bucket = await checkBucketExistence(userId)
  if (!bucket) await addBucket(userId)

  const route = path.length > 1 ? `${userId}/${path}` : `${userId}`

  const newImage = await addScalewayImage(image, route)
  if (!newImage) throw new ClientError('Could not add the image', 404)

  response(res, 201, newImage)
}

module.exports = { addGenericImage: catchedAsync(addGenericImage) }
