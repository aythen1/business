const { getObjectTags } = require("../../services/assets/object-get-tags");
const { catchedAsync, response } = require("../../utils/err");
const { ClientError } = require("../../utils/err/errors");

const getFileTags = async (req, res) => {
  const { fileName, userId } = req.query;
  const foundFile = await getObjectTags({ fileName, userId });
  if (!foundFile) throw new ClientError("Could not found the file", 400);

  response(res, 203, foundFile);
};

module.exports = { getFileTags: catchedAsync(getFileTags) };
