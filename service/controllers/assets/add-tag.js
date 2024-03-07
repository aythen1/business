const {
  checkBucketExistence,
} = require("../../services/assets/check-existence-bucket-scaleway");
const { addBucket } = require("../../services/assets/create-bucket-scaleway");
const { getObjectData } = require("../../services/assets/object-get-data");
const { setTag } = require("../../services/assets/set-tag-to-file");
const { catchedAsync, response } = require("../../utils/err");
const { ClientError } = require("../../utils/err/errors");

const addTag = async (req, res) => {
  const { fileName, userId } = req.body;
  console.log({ fileName, userId });
  const bucket = await checkBucketExistence(userId);
  if (!bucket) await addBucket(userId);

  const data = await getObjectData({ userId, fileName });
  if (!data) throw new ClientError("Could not find file", 404);

  const updatedObject = await setTag({
    fileName,
    userId,
  });

  response(res, 201, updatedObject);
};

module.exports = { addTag: catchedAsync(addTag) };
