const s3 = require('../../../config/awsConfig.js')
const { ClientError } = require('../../../utils/err/errors.js')

const createFolder = async (path, id) => {
  const folderKey = `${path}/`
  const params = {
    Bucket: `${id}/${path}`,
    Key: folderKey,
    Body: 'folder',
    ACL: 'public-read' 
  }

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(new ClientError('Error creating folder', 500))
      } else {
        resolve(data.Location)
      }
    })
  })
}

module.exports = { createFolder }
