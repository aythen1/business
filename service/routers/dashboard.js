const { Router } = require('express')
const routesRouter = Router()


const {
    fetchsDashboard,
    fetchDashboard,
    deleteDashboard,
    updateDashboard
} = require('../controllers/dashboard')


routesRouter.get('/', fetchsDashboard)
routesRouter.get('/:id', fetchDashboard)

routesRouter.delete('/', deleteDashboard)
routesRouter.post('/', updateDashboard)

module.exports = routesRouter
