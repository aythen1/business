const {
  checkBucketExistence
} = require('../../services/assets/check-existence-bucket-scaleway')
const {
  addBucket
} = require('../../services/assets/create-bucket-scaleway')

const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')

const addNewBucket = async (req, res) => {
  const { userId } = req.body

  console.log('ADD NEW BUCKET')
  const bucket = await checkBucketExistence(userId)
  console.log('CHECK BUCKET')
  if (!bucket) {
    const createdBucket = await addBucket(userId)
    console.log('CREANDO BUCKET')
    if (!createdBucket) console.log('ERRRORRRRRRRRR')
    throw new ClientError('Could not create the bucket', 400)
  }

  response(res, 203, 'newBucket created')
}

module.exports = { addNewBucket: catchedAsync(addNewBucket) }
