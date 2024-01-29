const s3 = require('../../awsConfig.js')
const { ClientError } = require('../../utils/err/errors.js')

const renameS3Folder = async ({ bucketName, oldFolderPath, newFolderPath }) => {
  try {
    if (!oldFolderPath.endsWith('/')) {
      oldFolderPath += '/'
    }
    if (!newFolderPath.endsWith('/')) {
      newFolderPath += '/'
    }

    const listParams = {
      Bucket: bucketName,
      Prefix: oldFolderPath
    }

    const listedObjects = await s3.listObjectsV2(listParams).promise()

    const renameMapping = {}

    for (const object of listedObjects.Contents) {
      const newKey = object.Key.replace(oldFolderPath, newFolderPath)
      renameMapping[object.Key] = newKey
    }
    console.log('renameMapping', renameMapping)
    const copyDeleteParams = {
      Bucket: bucketName,
      Delete: { Objects: [] }
    }

    for (const sourceKey in renameMapping) {
      const destKey = renameMapping[sourceKey]

      copyDeleteParams.Delete.Objects.push({ Key: sourceKey })

      copyDeleteParams.Delete.Objects.push({ Key: destKey })
    }
    console.log('copyDeleteParams', copyDeleteParams.Objects)

    // await s3.deleteObjects(copyDeleteParams).promise()

    return `Carpeta "${oldFolderPath}" renombrada a "${newFolderPath}"`
  } catch (err) {
    throw new ClientError('Error changing folder name', 404)
  }
}

module.exports = { renameS3Folder }
