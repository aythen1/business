const { Router } = require('express')
const routerUser = Router()

const { addUser } = require('../../controllers/users/add-user')
const { updateUser } = require('../../controllers/users/update-user')
const { verifyUser } = require('../../controllers/users/verify-user')
const { deleteUser } = require('../../modules/user/user.controller')
const { loginUser } = require('../../controllers/users/login-user')
const { patchUser } = require('../../controllers/users/patch-user')
const { updatePassword } = require('../../controllers/users/update-password')
const { getAllUsers } = require('../../controllers/users/get-all-user')
const { getIdUser } = require('../../controllers/users/get-id-user')
const { decoderUser } = require('../../controllers/users/decoder-user')
const {
  getAllUsersByWorkspace
} = require('../../controllers/users/get-all-user-by-workspace')
const {
  getAllUsersByProject
} = require('../../controllers/users/get-all-user-by-project')
const {
  getBillingDates
} = require('../../controllers/users/get-user-billingDates')

const loginWithGoogle = require('../../controllers/users/login-by-google')
const loginWithGitHub = require('../../controllers/users/login-by-github')
const {
  validateUserMiddleware,
  validatePatchUserMiddleware
} = require('../../middlewares/validation/user/userValidation')
const {
  getAllFreelancer
} = require('../../controllers/users/get-all-freelancer')

routerUser
  .post('/register', validateUserMiddleware, addUser)
  .post('/login', loginUser)
  .use('/login/github', loginWithGitHub)
  .use('/login/google', loginWithGoogle)
  .post('/verify', verifyUser)
  .put('/recovery', updatePassword)
  .patch('/:id', validatePatchUserMiddleware, patchUser)
  .put('/:id', updateUser)
  .get('/allFreelancer', getAllFreelancer)
  .get('/', getAllUsers)
  .get('/decode', decoderUser)
  .get('/byproject/:id', getAllUsersByProject)
  .get('/workspace/:id', getAllUsersByWorkspace)
  .get('/:id', getIdUser)
  .get('/billing-dates/:id', getBillingDates)
  .delete('/:id', deleteUser)

module.exports = routerUser
