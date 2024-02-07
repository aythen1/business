const { Router } = require('express')
const routesRouter = Router()

const { authenticateToken } = require('../middlewares/auth/auth');



const {
    fetchsTicket,
    fetchTicket,
    deleteTicket,
    addTicket,
    updateTicket,

    addVectorTicket,
    vectorTicket
} = require('../controllers/ticket')


// routesRouter.get('/', authenticateToken, fetchsTicket)


routesRouter.get('/', authenticateToken, fetchsTicket);
routesRouter.get('/:id', authenticateToken, fetchTicket)
routesRouter.delete('/', authenticateToken, deleteTicket)
routesRouter.post('/', authenticateToken, addTicket)
routesRouter.put('/', authenticateToken, updateTicket)

routesRouter.post('/vector', authenticateToken, addVectorTicket)
routesRouter.post('/vector/:id', authenticateToken, vectorTicket)


module.exports = routesRouter
