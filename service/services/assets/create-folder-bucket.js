const s3 = require("../../awsConfig.js");
const { ClientError } = require("../../utils/err/errors.js");

const createFolder = async (folderName, id) => {
  const folderKey = folderName.endsWith("/") ? folderName : `${folderName}/`;
  const params = {
    Bucket: id,
    Key: folderKey,
    Body: "folder",
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        console.log("soy un error");
        reject(new ClientError("Error creating folder", 500));
      } else {
        resolve(data.Location);
      }
    });
  });
};

module.exports = { createFolder };
