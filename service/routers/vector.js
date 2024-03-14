const { Router } = require('express')
const routerVector = Router()


const { authenticateToken } = require('../middlewares/auth/auth');



const {
  addVector,
  updateVector,
  addVectorData,
  shareFileVector,

  loadVector,
  deleteVector,
  removeVector,
  duplyVector,

  openVector,
  getVector,
  getAllVector,

  addBackupVector,
  deleteBackupVector,
} = require('../controllers/vector')

routerVector
  .post('/', authenticateToken, addVector)
  .post('/update/:id/:name', authenticateToken, updateVector)
  .post('/data', authenticateToken, addVectorData)
  .post('/share/:id', authenticateToken, shareFileVector)

  .post('/file', authenticateToken, openVector)
  .post('/duply/:id/:name', authenticateToken, duplyVector)
  .post('/load/:id/:name', authenticateToken, loadVector)

  .delete('/:id/:name', authenticateToken, deleteVector)
  .post('/remove/all', authenticateToken, removeVector)
  .post('/:id/:name', authenticateToken, getVector)
  .get('/', authenticateToken, getAllVector)

  .post('/backup/:id/:name', authenticateToken, addBackupVector)
  .delete('/backup/:id/:name', authenticateToken, deleteBackupVector)

module.exports = routerVector




