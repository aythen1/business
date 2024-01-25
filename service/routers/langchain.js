const { Router } = require('express')
const routesRouter = Router()


const {
    routerScaleway,
    routerLangchain,
    routerDashboard,
    routerOpenai
} = require('./*')


routesRouter.post('/scaleway/*', routerScaleway)
routesRouter.post('/langchain/*', routerLangchain)
routesRouter.post('/dashboard/*', routerDashboard)
routesRouter.post('/openai/*', routerOpenai)

module.exports = routesRouter
