const { Router } = require('express')
const routerEditor = Router()

const {
  changeFolderName
} = require('../controllers/assets/change-folder-name')
const { addFolder } = require('../controllers/assets/add-folder')
const { copyFile } = require('../controllers/assets/copy-file-controller')
const { moveFile } = require('../controllers/assets/move-file-controller')
const { addNewBucket } = require('../controllers/assets/add-bucket')
const { logicDelete } = require('../controllers/assets/logic-delete')
const { restoreFile } = require('../controllers/assets/restore-object')
// const {
//   addImageProject
// } = require('../controllers/assets/add-image-project')
const { multerUploads } = require('../middlewares/multer')
// const { addIconProject } = require('../controllers/assets/add-icon')
const { addSubFolder } = require('../controllers/assets/add-sub-folder')
const {
  addGenericImage
} = require('../controllers/assets/add-generic-image')
const { getDirectories } = require('../controllers/assets/get-directories')
const { getDirectoriesVersions } = require('../controllers/assets/get-directories-versions')
const { directoriesDB } = require('../controllers/assets/directories-db')
const { deleteFolder } = require('../controllers/assets/delete-folder')
const { deleteFolders } = require('../controllers/assets/delete-folders')
const { deleteFile } = require('../controllers/assets/delete-file')
const { getFile } = require('../controllers/assets/get-file')
const { getFileData } = require('../controllers/assets/get-file-data')

routerEditor
  .post('/directories-db', directoriesDB)

  .post('/new-folder', addFolder)
  .post('/change-folder-name', changeFolderName)
  .post('/copy-file', copyFile)
  .post('/move-file', moveFile)
  .post('/new-bucket', addNewBucket)
  .post('/new-subfolder', addSubFolder)
  .post('/add-image', multerUploads, addGenericImage)
  // .post('/project/add-image', multerUploads, addImageProject)
  // .post('/icons', multerUploads, addIconProject)
  .get('/directories', getDirectories)
  .get('/directories/versions', getDirectoriesVersions)
  .put('/update-storage', logicDelete)
  .put('/restore-storage', restoreFile)
  .get('/file', getFile)
  .get('/file-data', getFileData)
  .delete('/delete-folders', deleteFolders)
  .delete('/delete-folder', deleteFolder)
  .delete('/file', deleteFile)

module.exports = routerEditor
