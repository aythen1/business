const { Router } = require('express')
const routesRouter = Router()


const {
    fetchsDep,
    installDep,
    unInstallDep
} = require('../controllers/sys')


routesRouter.post('/search', fetchsDep)
routesRouter.post('/', installDep)
routesRouter.delete('/', unInstallDep)

module.exports = routesRouter
