const { getObjectS3 } = require('../../services/assets/object-get')
const { catchedAsync, response } = require('../../utils/err')
const { ClientError } = require('../../utils/err/errors')

const getFile = async (req, res) => {
  const { fileName, userId } = req.query
  const foundFile = await getObjectS3({ fileName, userId })
  if (!foundFile) throw new ClientError('Could not found the file', 400)

  response(res, 203, foundFile)
}

module.exports = { getFile: catchedAsync(getFile) }
