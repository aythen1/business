const s3 = require('../../awsConfig.js')
const { ClientError } = require('../../utils/err/errors.js')

const addBucket = async (id) => {
  const params = {
    Bucket: id,
    ACL: 'public-read',
    CreateBucketConfiguration: {
      LocationConstraint: 'fr-par'
    }
    // BucketPolicy: JSON.stringify({
    //   Version: '2012-10-17'
    // Statement: [
    //   {
    //     Sid: 'DelegateAccess',
    //     Effect: 'Allow',
    //     Principal: '*',
    //     Action: ['s3:GetObject', 's3:PutObject', 's3:DeleteObject'],
    //     Resource: 'arn:aws:s3:::' + id + '/*'
    //   }
    // ]
    // })
  }

  return new Promise((resolve, reject) => {
    // console.log('params', params)
    s3.createBucket(params, (err, data) => {
      if (err) {
        reject(new ClientError('Error al crear el bucket', err, 500))
      } else {
        const response = {
          message: 'Bucket creado con éxito',
          bucketName: id,
          data
        }
        resolve(response)
      }
    })
  })
}

module.exports = { addBucket }
