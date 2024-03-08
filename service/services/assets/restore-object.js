const s3 = require("../../awsConfig.js");
const { ClientError } = require("../../utils/err/errors.js");

const restoreObject = async ({ fileName, userId }) => {
  const copyParams = {
    Key: fileName,
    Bucket: userId,
    RestoreRequest: {
      Days: 1,
    },
  };

  return new Promise((resolve, reject) => {
    s3.restoreObject(copyParams, (err, data) => {
      if (err) {
        reject(new ClientError("Error restoring object", 500));
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = { restoreObject };
