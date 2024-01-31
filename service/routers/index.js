

const { Router } = require('express')
const mainRouter = Router()


// const routerDashboard = require('./dashboard')
// const routerLangchain = require('./langchain')
const routerEmail = require('./email')
const routerOpenai = require('./openai')
const routerDashboard = require('./dashboard')
const routerIAM = require('./iam')
const routerAddon = require('./addon')
const routerAssets = require('./assets')
// const routerPuppeter = require('./puppeter')
// const routerPush = require('./push')
// const routerScaleway = require('./scaleway')
// const routerUser = require('./user')


// mainRouter.post('/dashboard/*', routerDashboard)
// mainRouter.post('/langchain/*', routerEmail)
// mainRouter.post('/dashboard/*', routerLangchain)
mainRouter.use('/email', routerEmail)
mainRouter.use('/dashboard', routerDashboard)
mainRouter.use('/openai', routerOpenai)
mainRouter.use('/iam', routerIAM)
mainRouter.use('/addon', routerAddon)
mainRouter.use('/assets', routerAssets)
// mainRouter.post('/puppeter/*', routerPuppeter)
// mainRouter.post('/push*', routerPush)
// mainRouter.post('/scaleway/*', routerScaleway)
// mainRouter.post('/user/*', routerUser)

module.exports = mainRouter

