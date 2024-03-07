const s3 = require("../../awsConfig.js");
const { ClientError } = require("../../utils/err/errors");

const getDirectoryContent = async (bucketName, Prefix) => {
  // console.log('getDirectoryContent', { bucketName, Prefix })

  const params = {
    Bucket: bucketName,
    Prefix,
    OptionalObjectAttributes: ["Contents", "IsTruncated", "VersionId"],
    // TagFilter: [
    //   {
    //     Key: "Tag1Key",
    //     Value: "Tag1Value",
    //   },
    //   {
    //     Key: "Tag2Key",
    //     Value: "Tag2Value",
    //   },
    // ],
  };

  return new Promise((resolve, reject) => {
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log({ err });
        reject(new ClientError("Error getting directory contents", err));
      } else {
        resolve(data.Contents);
      }
    });
  });
};

module.exports = { getDirectoryContent };
