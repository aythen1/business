const s3 = require("../../awsConfig.js");
const { ClientError } = require("../../utils/err/errors.js");

const deleteS3Folder = async (bucketName, folderPath, VersionId) => {
  console.log({ bucketName, folderPath });
  try {
    const listParams = {
      Bucket: bucketName,
      Prefix: folderPath,
    };

    const objects = await s3.listObjectVersions(listParams).promise();
    console.log({ objects });
    if (objects.Versions.length > 0) {
      const deleteParams = {
        Bucket: bucketName,
        Delete: { Objects: [] },
      };

      objects.Versions.forEach((obj) => {
        deleteParams.Delete.Objects.push({ Key: obj.Key });
      });
      console.log({ objects: deleteParams.Delete.Objects });
      await s3.deleteObjects(deleteParams).promise();
    }

    // await s3.deleteObject({ Bucket: bucketName, Key: folderPath }).promise();

    return `Folder "${folderPath}" successfully deleted`;
  } catch (err) {
    console.log("err", err);
    throw new ClientError("Error deleting folder", 500);
  }
};

module.exports = { deleteS3Folder };
