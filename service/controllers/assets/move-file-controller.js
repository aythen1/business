const {
  moveImageToAnotherBucket,
} = require("../../services/assets/move-image-bucket");
const {
  checkBucketExistence,
} = require("../../services/assets/check-existence-bucket-scaleway");
const { addBucket } = require("../../services/assets/create-bucket-scaleway");
const { catchedAsync, response } = require("../../utils/err");
const { ClientError } = require("../../utils/err/errors");

const moveFile = async (req, res) => {
  const {
    sourceBucket,
    sourceKey,
    destinationBucket,
    destinationKey,
    userId,
    VersionId,
  } = req.body;

  const bucket = await checkBucketExistence(userId);
  if (!bucket) await addBucket(userId);

  const newFile = await moveImageToAnotherBucket(
    sourceBucket,
    sourceKey,
    destinationBucket,
    destinationKey,
    VersionId
  );

  if (!newFile) throw new ClientError("Could not copy the file", 404);

  response(res, 201, newFile);
};

module.exports = { moveFile: catchedAsync(moveFile) };
