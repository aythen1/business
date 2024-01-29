const s3 = require('../../awsConfig.js')
const { ClientError } = require('../../utils/err/errors')

const getDirectoryContent = async (bucketName, Prefix) => {
  // console.log('getDirectoryContent', { bucketName, Prefix })

  const params = {
    Bucket: bucketName,
    Prefix,
    OptionalObjectAttributes: ['Contents', 'IsTruncated']
  }

  return new Promise((resolve, reject) => {
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        reject(new ClientError('Error getting directory contents', 500))
      } else {
        const contents = data.Contents.map((item) => item.Key)
        // console.log('getDirectoryContent contents', contents)
        // console.log('getDirectoryContent data.Contents', data.Contents)
        resolve(data.Contents)
      }
    })
  })
}

module.exports = { getDirectoryContent }
