const s3 = require('../../awsConfig.js')
const { ClientError } = require('../../utils/err/errors.js')

const moveImageToAnotherBucket = async (
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

  try {
    await s3.copyObject(copyParams).promise()

    const deleteParams = {
      Bucket: sourceBucket,
      Key: sourceKey
    }
    await s3.deleteObject(deleteParams).promise()

    return `Copied from ${sourceBucket}/${sourceKey} to ${destinationBucket}/${destinationKey}`
  } catch (err) {
    console.error(err)
    throw new ClientError('Error copying image', 500)
  }
}

module.exports = { moveImageToAnotherBucket }
