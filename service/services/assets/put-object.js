const s3 = require('../../awsConfig.js')
const { ClientError } = require('../../utils/err/errors.js')

const putObject = async ({ fileName, userId, StorageClass, Body }) => {
  const copyParams = {
    Key: fileName,
    Bucket: userId,
    StorageClass,
    Body
  }
  console.log({ copyParams })

  return new Promise((resolve, reject) => {
    s3.putObject(copyParams, (err, data) => {
      if (err) {
        reject(new ClientError('Error getting directory contents', 500))
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = { putObject }
