const s3 = require("../../awsConfig.js");
const { ClientError } = require("../../utils/err/errors.js");

const setTag = async ({ fileName, userId }) => {
  const tagging = {
    TagSet: [
      {
        Key: "Tag1Key", // Nombre de la clave de la etiqueta
        Value: "Tag1Value", // Valor de la etiqueta
      },
      {
        Key: "Tag2Key", // Nombre de la clave de la segunda etiqueta
        Value: "Tag2Value", // Valor de la segunda etiqueta
      },
    ],
  };

  const copyParams = {
    Key: fileName,
    Bucket: userId,
    Tagging: tagging,
  };

  return new Promise((resolve, reject) => {
    s3.putObjectTagging(copyParams, (err, data) => {
      if (err) {
        reject(new ClientError("Error getting directory contents", 500));
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = { setTag };
