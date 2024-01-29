// const s3 = require('../../../config/awsConfig.js')
const { ClientError } = require('../../utils/err/errors.js')

const getObjectS3 = async ({ fileName, userId }) => {
  if (!fileName) {
    return Promise.reject(new ClientError('No URL given', 400))
  }

  // const params = {
  //   Bucket: userId,
  //   Key: fileName
  // }
  // console.log(params)
  // return new Promise((resolve, reject) => {
  //   s3.getObject(params, (err, data) => {
  //     if (err) {
  //       console.error(err)
  //       reject(new ClientError('Error al obtener el archivo', 500))
  //     } else {

  //       const base64EncodedBody = Buffer.from(data.Body).toString('base64')

  //       const responseData = {
  //         ...data,
  //         Body: base64EncodedBody
  //       }

  //       console.log('Archivo obtenido con éxito', responseData)
  //       resolve(responseData)
  //     }
  // })
  // })
  return `https://${userId}.s3.fr-par.scw.cloud/${fileName}`
}

module.exports = { getObjectS3 }
