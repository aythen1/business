const { Router } = require('express')
const routesRouter = Router()


const {
    fetchsDashboard,
    fetchDashboard,
    deleteDashboard,
    addDashboard,
    updateDashboard
} = require('../controllers/dashboard')


routesRouter.get('/', fetchsDashboard)
routesRouter.get('/:id', fetchDashboard)

routesRouter.delete('/', deleteDashboard)
routesRouter.put('/', updateDashboard)
routesRouter.post('/', addDashboard)

module.exports = routesRouter
