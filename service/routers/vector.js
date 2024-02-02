const { Router } = require('express')
const routerVector = Router()

const {
    loadVector,
    addVector,
    deleteVector,
    removeVector,
    openVector,
    getVector,
    getAllVector,
    updateVector
} = require('../controllers/vector')

routerVector
  .post('/file', openVector)
  .post('/', addVector)
  .post('/load/:id/:name', loadVector)
  .post('/update/:id/:name', updateVector)
  .delete('/update/:id/:name', deleteVector)
  .post('/remove/all', removeVector)
  .post('/:id/:name', getVector)
  .get('/', getAllVector)
  

module.exports = routerVector




