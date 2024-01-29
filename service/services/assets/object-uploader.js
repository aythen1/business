const s3 = require('../../../config/awsConfig.js')
const { ClientError } = require('../../../utils/err/errors.js')

const uploadObjectToS3 = async (file) => {
  if (!file) throw new ClientError('No file uploaded', 400)

  const params = {
    Bucket: 'data-aythen', // Bucket name
    Key: file.originalname,
    Body: file.buffer
  }

  // Upload the file to S3 using the AWS SDK
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err)
        reject(new ClientError('Error uploading image', 500))
      } else {
        resolve(data.Location)
      }
    })
  })
}

module.exports = { uploadObjectToS3 }
