const s3 = require("../../awsConfig.js");
const { ClientError } = require("../../utils/err/errors.js");

const getDirectoryContentVersions = async (bucketName, Prefix) => {
  console.log("getDirectoryContentVersions", { bucketName, Prefix });

  const params = {
    Bucket: bucketName,
    Prefix,
    OptionalObjectAttributes: [
      "Contents",
      "IsTruncated",
      "StorageClass",
      "RestoreStatus",
    ],
  };

  return new Promise((resolve, reject) => {
    s3.listObjectVersions(params, (err, data) => {
      if (err) {
        reject(new ClientError("Error getting directory contents", 500));
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = { getDirectoryContentVersions };
