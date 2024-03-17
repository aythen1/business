const { Router } = require('express')
const routesRouter = Router()


const {
    suscription,
    suscriptionDeny,

    addMethodCard,
    deleteMethodCard,

    fetchsSuscription,
    fetchsCard,

    fetchResume,

    //
    createSession,
    createTransfer,
    createExpressAccount,
    createAccountLink,
    paymentSheet,
    paymentSuccess,
    paymentCancel,
} = require('../controllers/stripe')


routesRouter.post('/suscription', suscription)
routesRouter.post('/suscription/deny', suscriptionDeny)

routesRouter.post('/card/add', addMethodCard)
routesRouter.post('/card/deny', deleteMethodCard)

routesRouter.get('/suscription', fetchsSuscription)
routesRouter.get('/card', fetchsCard)

routesRouter.get('/resume', fetchResume)

///
routesRouter.post('/session', createSession)
routesRouter.post('/transfer', createTransfer)
routesRouter.post('/account/express', createExpressAccount)
routesRouter.post('/account/link', createAccountLink)
routesRouter.post('/payment/sheet', paymentSheet)
routesRouter.post('/payment/success', paymentSuccess)
routesRouter.post('/payment/cancel', paymentCancel)


module.exports = routesRouter
