const { Router } = require('express')
const routerVector = Router()


const { authenticateToken } = require('../middlewares/auth/auth');



const {
  addVector,
  updateVector,
  addVectorData,

  loadVector,
  deleteVector,
  removeVector,
  openVector,
  getVector,
  getAllVector,
} = require('../controllers/vector')

routerVector
  .post('/', authenticateToken, addVector)
  .post('/update/:id/:name', authenticateToken, updateVector)
  .post('/data', authenticateToken, addVectorData)

  .post('/file', authenticateToken, openVector)
  .post('/load/:id/:name', authenticateToken, loadVector)

  .delete('/:id/:name', authenticateToken, deleteVector)
  .post('/remove/all', authenticateToken, removeVector)
  .post('/:id/:name', authenticateToken, getVector)
  .get('/', authenticateToken, getAllVector)


module.exports = routerVector




