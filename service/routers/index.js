const { Router } = require('express')
const mainRouter = Router()



const routerEmail = require('./email')
const routerTicket = require('./ticket')
const routerDashboard = require('./dashboard')
const routerIAM = require('./iam')
const routerAddon = require('./addon')
const routerAssets = require('./assets')
const routerVector = require('./vector')
const routerChatbot = require('./chatbot')
// const routerPuppeter = require('./puppeter')
// const routerPush = require('./push')





mainRouter.use('/email', routerEmail)
mainRouter.use('/ticket', routerTicket)
mainRouter.use('/dashboard', routerDashboard)
mainRouter.use('/iam', routerIAM)
mainRouter.use('/addon', routerAddon)
mainRouter.use('/assets', routerAssets)
mainRouter.use('/vector', routerVector)
mainRouter.use('/chatbot', routerChatbot)
// mainRouter.post('/puppeter/*', routerPuppeter)
// mainRouter.post('/push*', routerPush)

module.exports = mainRouter

