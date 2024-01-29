const s3 = require('../../awsConfig.js')
const { ClientError } = require('../../utils/err/errors')

const addScalewayImage = async (file, route, key) => {
  if (!file) throw new ClientError('No file uploaded', 400)

  const params = {
    Bucket: `${route}`,
    Key: key || file.originalname,
    Body: key ? file : file.buffer,
    ACL: 'public-read' 
  }

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(new ClientError('Error uploading image', 500))
      } else {
        resolve(data.Location)
      }
    })
  })
}

module.exports = { addScalewayImage }
