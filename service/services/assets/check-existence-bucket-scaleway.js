const s3 = require('../../awsConfig.js')

const checkBucketExistence = async (bucketName) => {
  const params = {
    Bucket: bucketName
  }

  return new Promise((resolve, reject) => {
    s3.headBucket(params, (err) => {

      if (err) {
        if (err.statusCode === 404 || err.statusCode === 400) {
          resolve(false)
        } else {
          reject(err)
        }
      } else {
        resolve(true)
      }
    })
  })
}

module.exports = { checkBucketExistence }
