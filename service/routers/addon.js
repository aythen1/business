const { Router } = require('express')
const routesRouter = Router()


const {
    verifyUser
} = require('../controllers/addon')


routesRouter.post('/verify/*', verifyUser)

module.exports = routesRouter
