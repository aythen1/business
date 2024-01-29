const s3 = require('../../awsConfig.js')
const { ClientError } = require('../../utils/err/errors.js')

const copyImageToAnotherBucket = async (
  sourceBucket,
  sourceKey,
  destinationBucket,
  destinationKey
) => {
  const copyParams = {
    CopySource: `/${sourceBucket}/${sourceKey}`,
    Bucket: destinationBucket,
    Key: destinationKey,
    ACL: 'public-read'
  }

  return new Promise((resolve, reject) => {
    s3.copyObject(copyParams, (err, data) => {
      if (err) {
        reject(new ClientError('Error getting directory contents', 500))
      } else {
        console.log('copyObject data', data)

        resolve(data)
      }
    })
  })
}

module.exports = { copyImageToAnotherBucket }
