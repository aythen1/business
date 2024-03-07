const { deleteObjectToS3 } = require("../../services/assets/object-delete");

const { catchedAsync, response } = require("../../utils/err");
const { ClientError } = require("../../utils/err/errors");

// const deleteFiles = async (req, res) => {
//   const { userId, folders } = req.body

//   console.log('dicuwducn', folders)
//   // console.log({ userId, path })
//   // const deletedFolder = await deleteS3Folder(userId, path)
//   // if (!deletedFolder) throw new ClientError('Could not delete the folder', 400)

//   // response(res, 203, deletedFolder)
// }

const deleteFiles = async (req, res) => {
  try {
    const { userId, folders } = req.body;
    console.log({ userId, folders });
    // Crear un array de promesas para eliminar cada carpeta
    const deletePromises = folders.map((folder) =>
      deleteObjectToS3({
        path: folder.Key,
        userId,
        VersionId: folder.VersionId,
      })
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

module.exports = { deleteFiles: catchedAsync(deleteFiles) };
