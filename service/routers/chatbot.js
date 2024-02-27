const { Router } = require('express')
const routesRouter = Router()

const { authenticateToken } = require('../middlewares/auth/auth');



const {
    fetchsChatbot,
    fetchChatbot,
    deleteChatbot,
    addChatbot,
    updateChatbot,

    addVectorChatbot,
    vectorChatbot
} = require('../controllers/chatbot')




routesRouter.get('/', authenticateToken, fetchsChatbot);
routesRouter.get('/:id', authenticateToken, fetchChatbot)
routesRouter.delete('/', authenticateToken, deleteChatbot)
routesRouter.post('/', authenticateToken, addChatbot)
routesRouter.put('/', authenticateToken, updateChatbot)

routesRouter.post('/vector', authenticateToken, addVectorChatbot)
routesRouter.post('/vector/:id', authenticateToken, vectorChatbot)


module.exports = routesRouter
