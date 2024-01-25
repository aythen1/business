const { Router } = require('express')
const routesRouter = Router()


const {
    chatStream,
    retreiveContext,
    createEmbeddingsTable,
} = require('../controllers/insert')


routesRouter.post('/chat', chatStream)
routesRouter.post('/create', createEmbeddingsTable)
routesRouter.post('/retreive', retreiveContext)

module.exports = routesRouter
