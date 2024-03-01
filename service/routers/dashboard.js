const { Router } = require('express')
const routesRouter = Router()

const { authenticateToken } = require('../middlewares/auth/auth');


const {
    fetchsDashboard,
    fetchDashboard,
    deleteDashboard,
    addDashboard,
    updateDashboard
} = require('../controllers/dashboard')


routesRouter.get('/', authenticateToken, fetchsDashboard)
routesRouter.get('/:id', authenticateToken, fetchDashboard)

routesRouter.delete('/', authenticateToken, deleteDashboard)
routesRouter.put('/', authenticateToken, updateDashboard)
routesRouter.post('/', authenticateToken, addDashboard)

module.exports = routesRouter
