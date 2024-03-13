const { Router } = require('express')
const routesRouter = Router()

const { authenticateToken } = require('../middlewares/auth/auth');



const {
    getBackup,
    addBackup,
    deleteBackup,
} = require('../controllers/backup')




routesRouter.get('/', authenticateToken, getBackup);
routesRouter.post('/', authenticateToken, addBackup)
routesRouter.delete('/', authenticateToken, deleteBackup)


module.exports = routesRouter
