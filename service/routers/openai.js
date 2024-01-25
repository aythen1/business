const { Router } = require('express')
const routesRouter = Router()


// const {
//     loadingTask,
//     // routerScaleway,
//     // routerLangchain,
//     // routerDashboard,
//     // routerOpenai
// } = require('../controllers/openai')


const {
    test
} = require('../services/toHTML/test')

// routesRouter.post('/scaleway/*', routerScaleway)
// routesRouter.post('/langchain/*', routerLangchain)
// routesRouter.post('/dashboard/*', routerDashboard)
routesRouter.post('/test', test)

module.exports = routesRouter
