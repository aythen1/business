const { Router } = require('express')
const routesRouter = Router()

  
const {
    loadVector,
    addVector,
    deleteVector,
    removeVector,
    removeAllVector,
    openVector,
    getVector,
    getAllVector,
    indexVector,
    updateVector
} = require('../controllers/pivot')


routesRouter.get('/:id/:name', getVector)
routesRouter.get('/all/:id', getAllVector)

routesRouter.post('/file', openVector)
routesRouter.post('/load/:id/:name', loadVector)
routesRouter.post('/:id', addVector)
routesRouter.post('/update/:id/:name', updateVector)
routesRouter.post('/index/:id*', indexVector)
routesRouter.post('/remove', removeVector)
routesRouter.post('/remove/all', removeAllVector)
routesRouter.post('/delete', deleteVector)

module.exports = routesRouter
