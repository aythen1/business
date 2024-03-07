const { Router } = require('express')
const routesRouter = Router()

const { authenticateToken } = require('../middlewares/auth/auth');



const {
    fetchsAddon,
    fetchAddon,
    deleteAddon,
    addAddon,
    updateAddon,

    getVectorAddon,
    addVectorAddon,

    visionAddon,
    codeAddon,
    rpaAddon
} = require('../controllers/addon')


// routesRouter.get('/', authenticateToken, fetchsAddon)


routesRouter.get('/', authenticateToken, fetchsAddon);
routesRouter.get('/:id', authenticateToken, fetchAddon)
routesRouter.delete('/', authenticateToken, deleteAddon)
routesRouter.post('/', authenticateToken, addAddon)
routesRouter.put('/', authenticateToken, updateAddon)

routesRouter.post('/:id/:name', authenticateToken, getVectorAddon)
routesRouter.post('/vector', authenticateToken, addVectorAddon)

routesRouter.post('/vision', authenticateToken, visionAddon)
routesRouter.post('/code', authenticateToken, codeAddon)
routesRouter.post('/rpa', authenticateToken, rpaAddon)

module.exports = routesRouter
