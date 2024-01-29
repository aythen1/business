const {
  getObjectData
} = require('../../services/assets/object-get-data')
const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')

const getFileData = async (req, res) => {
  const { fileName, userId } = req.query
  const foundFile = await getObjectData({ fileName, userId })
  if (!foundFile) throw new ClientError('Could not found the file', 400)

  response(res, 203, foundFile)
}

module.exports = { getFileData: catchedAsync(getFileData) }
