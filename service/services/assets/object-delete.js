const s3 = require('../../awsConfig.js')
const { ClientError } = require('../../utils/err/errors.js')

const deleteObjectToS3 = async ({ path, userId, VersionId }) => {
  if (!path) {
    return Promise.reject(new ClientError('No URL given', 400))
  }

  console.log({ VersionId })

  const regularObject = {
    Bucket: userId,
    Key: path
  }
  const deleteMarker = {
    Bucket: userId,
    Key: path,
    VersionId
  }

  const params = VersionId === '' ? regularObject : deleteMarker
  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.error(err)
        reject(new ClientError('Error al eliminar el archivo', 500))
      } else {
        console.log('Archivo eliminado con éxito')
        resolve()
      }
    })
  })
}

module.exports = { deleteObjectToS3 }
