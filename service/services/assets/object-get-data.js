const s3 = require('../../awsConfig.js')
const { ClientError } = require('../../utils/err/errors.js')

const getObjectData = async ({ fileName, userId }) => {
  if (!fileName) {
    return Promise.reject(new ClientError('No URL given', 400))
  }

  const params = {
    Bucket: userId,
    Key: fileName
  }
  return new Promise((resolve, reject) => {
    s3.getObject(params, (err, data) => {
      if (err) {
        console.error(err)
        reject(new ClientError('Error al obtener el archivo', 500))
      } else {
        resolve(data)
      }
    })
  })
  // return `https://${userId}.s3.fr-par.scw.cloud/${fileName}`
}

module.exports = { getObjectData }
