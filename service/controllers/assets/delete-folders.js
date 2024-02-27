const {
  deleteS3Folder,
} = require("../../services/assets/delete-folder-bucket");
const { catchedAsync, response } = require("../../utils/err");
const { ClientError } = require("../../utils/err/errors");

// const deleteFolders = async (req, res) => {
//   const { userId, folders } = req.body

//   console.log('dicuwducn', folders)
//   // console.log({ userId, path })
//   // const deletedFolder = await deleteS3Folder(userId, path)
//   // if (!deletedFolder) throw new ClientError('Could not delete the folder', 400)

//   // response(res, 203, deletedFolder)
// }

const deleteFolders = async (req, res) => {
  try {
    const { id, folders } = req.body;

    // Crear un array de promesas para eliminar cada carpeta
    const deletePromises = folders.map((folder) =>
      deleteS3Folder(id, folder.Key, folder.VersionId)
    );

    // Esperar a que todas las promesas se resuelvan
    const deletedFolders = await Promise.all(deletePromises);

    // Puedes hacer algo con deletedFolders si lo necesitas

    // Enviar respuesta de éxito
    res.status(203).json({ success: true });
  } catch (error) {
    // Manejar errores
    console.error("Error deleting folders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { deleteFolders: catchedAsync(deleteFolders) };
