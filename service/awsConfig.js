const AWS = require('aws-sdk')

const { storAccessKey, storSecret, bucketUrl } = require('./credentials.json')

const s3 = new AWS.S3({
  accessKeyId: storAccessKey,
  secretAccessKey: storSecret,
  endpoint: bucketUrl
})

module.exports = s3
