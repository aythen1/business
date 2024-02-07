const s3 = require('../../awsConfig.js')

const catchedAsync = require('../../utils/err/catchedAsync')
const response = require('../../utils/err/response')

const {
  addVector,
  updateVector,
  getVector,
  deleteVector,
  removeVector,
} = require('../../services/lancedb')


const directoriesDB = async (req, res) => {
  try {
    const { id, folders } = req.body
    console.log('query11', id, folders)

    // Array para almacenar los datos de los archivos en formato base64
    const fileDataArray = [];

    // Iterar sobre los folders
    for (const folder of folders) {
      // Construir la clave completa del archivo en S3
      // const s3Key = `${id}/${folder}`;
      const s3Key = folder.Key

      // Descargar el archivo desde S3
      const s3Object = await s3.getObject({ Bucket: id, Key: s3Key }).promise();
      
      // Verificar si es un directorio (Size igual a cero)
      const isDirectory = s3Object.ContentLength === 0;
      if (!isDirectory) {
        // Convertir el contenido del archivo a base64
        const fileBase64 = s3Object.Body.toString('base64');
        
        // Almacenar los datos en el array
        fileDataArray.push({
          path: folder.Key, // Puedes personalizar cómo almacenas el nombre del archivo
          base64: fileBase64,
        });
      }
      
      console.log('fileDataArray', fileDataArray)
      
      const resp = await addVector(id, 'assets', vector = [0, 0], fileDataArray) 
      console.log('resprespresp', resp)
    }

    // Puedes almacenar los datos en tu base de datos utilizando lancedb (o la biblioteca que estés utilizando)
    // await lancedb.saveData(fileDataArray);

    // Puedes enviar una respuesta si es necesario
    res.status(200).json({ message: 'Archivos guardados exitosamente' });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  directoriesDB: catchedAsync(directoriesDB)
}
