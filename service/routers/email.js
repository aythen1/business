const { Router } = require('express')
const routesRouter = Router()


const {
    getEmail,
    sendEmail
} = require('../services/email')


routesRouter.get('/:id', getEmail)
routesRouter.get('/send', sendEmail)

module.exports = routesRouter
