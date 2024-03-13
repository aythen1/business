const { catchedAsync, response } = require('../utils/err')

const fs = require('fs').promises
const path = require('path')
const archiver = require('archiver');

const {
  addVector,
  updateVector,
  getVector,
  deleteVector,
  removeVector,
} = require('../services/lancedb')


const ID = 'test/test'


const encodeVector = (id) => {
  const str = `${id}`
  const base64Str = btoa(str)
  return base64Str
}


async function getFolderFromDirectory(directory) {
  try {
      const elements = await fs.readdir(directory);

      const folders = await Promise.all(
          elements.map(async (element) => {
              const fullPath = path.join(directory, element);
              const stats = await fs.stat(fullPath);
              
              if (stats.isDirectory() && element.endsWith('.lance')) {
                  return element.slice(0, -('.lance'.length));
              }
              
              return null;
          })
      );

      return folders.filter((folder) => folder !== null);
  } catch (error) {
      console.error('Error retrieving folder names:', error);
      return [];
  }
}




const getBackup = async (req, res) => {
  try {
    const path = encodeVector(ID)
    const data = await getVector(path, 'chatbots')

    if (Array.isArray(data)) {
      return res.status(200).send(data)
    }

    return res.status(200).send([])
  } catch (err) {
    return res.status(200).send([])
  }
}




const addBackup = async (req, res) => {
    try {

        const sourceFolder = '/ruta/a/tu/directorio/original';
        const backupFolder = '/ruta/a/tu/directorio/backup';


        const zipFilePath = path.join(backupFolder, 'backup.zip');
    
        // Crear un archivo ZIP
        const archive = archiver('zip', { zlib: { level: 9 } });
        const output = fs.createWriteStream(zipFilePath);
        archive.pipe(output);
    
        // Agregar el contenido del directorio original al archivo ZIP
        await archive.directory(sourceFolder, false);
    
        await output.end(); // Cerrar el archivo de salida
    
        res.send('Copia de seguridad realizada y almacenada como ZIP con éxito.');
      } catch (err) {
        console.error(err);
        res.status(500).send('Error al realizar la copia de seguridad y almacenar como ZIP.');
      }
  }
  
  

  
const deleteBackup = async (req, res) => {
    try {
      const path = encodeVector(ID)
      const data = await getVector(path, 'chatbots')
  
      if (Array.isArray(data)) {
        return res.status(200).send(data)
      }
  
      return res.status(200).send([])
    } catch (err) {
      return res.status(200).send([])
    }
  }
  
  





module.exports = {
  getBackup: catchedAsync(getBackup),
  addBackup: catchedAsync(addBackup),
  deleteBackup: catchedAsync(deleteBackup),

}