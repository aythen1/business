const { ClientError } = require('../../../utils/err/errors')
const { deleteFileToS3 } = require('../s3-aws/file-delete')

const deleteScalewayImage = async (fileName) => {
  const response = await deleteFileToS3(fileName)

  if (!response) throw new ClientError('Error: Failure deleting the file', 400)

  return response
}

module.exports = { deleteScalewayImage }
