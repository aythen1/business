const {
  checkBucketExistence
} = require('../../services/assets/check-existence-bucket-scaleway')
const {
  addBucket
} = require('../../services/assets/create-bucket-scaleway')
const {
  getDirectoryContent
} = require('../../services/assets/get-bucket-directory')
const catchedAsync = require('../../utils/err/catchedAsync')
const response = require('../../utils/err/response')

const getDirectories = async (req, res) => {
  const { userId, Prefix, index } = req.query
  console.log('query', { index })

  const bucket = await checkBucketExistence(userId)
  if (!bucket) await addBucket(userId)

  const contents = await getDirectoryContent(userId, Prefix)

  if (!contents) {
    response(res, 204, { message: 'No directories found' })
  } else {
    // const rootDirectories = directories
    //   .map((directory) => directory.split('/')[index])
    //   .filter((value, index, self) => self.indexOf(value) === index)
    response(res, 200, contents)
  }
}

module.exports = { getDirectories: catchedAsync(getDirectories) }
