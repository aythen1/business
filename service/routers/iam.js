const { Router } = require('express')
const routerIAM = Router()

const {
  fetchsDefault, 

  fetchsBilling, 
  updateBilling, 

  verifyUser,
  decoderUser,
  loginUser,
  registerUser,
  upgradeUser,
  avatarUser,
  updateUser,
  recoverPasswordUser,
  updatePasswordUser,

  addUser,
  deleteUser,
  fetchsUser,

  addApplication,
  deleteApplication,
  fetchsApplication,

  addPolice,
  deletePolice,
  fetchsPolice,

  addApi,
  deleteApi,
  fetchsApi,


  addLog,
  deleteLog,
  fetchsLog,
} = require('../controllers/iam')

routerIAM
.post('/load/default', fetchsDefault)

.post('/billing/fetchs', fetchsBilling)
.post('/billing/update', updateBilling)

.post('/user/verify', verifyUser)
.post('/user/decode', decoderUser)
.post('/user/login', loginUser)
.post('/user/register', registerUser)
.post('/user/upgrade', upgradeUser)
.get('/user/:id', avatarUser)
.post('/user', updateUser)
.post('/user/recover-password', recoverPasswordUser)
.post('/user/password', updatePasswordUser)

.post('/user/add-user', addUser)
.post('/user/delete-user', deleteUser)
.get('/user/all-user', fetchsUser)

.post('/application/add-application', addApplication)
.post('/application/delete-application', deleteApplication)
.get('/application/all-application', fetchsApplication)
  
.post('/police/add-police', addPolice)
.post('/police/delete-police', deletePolice)
.get('/police/all-police', fetchsPolice)

.post('/api/add-api', addApi)
.post('/api/delete-api', deleteApi)
.get('/api/all-api', fetchsApi)


.post('/log/add-log', addLog)
.post('/log/delete-log', deleteLog)
.get('/log/all-log', fetchsLog)
  
module.exports = routerIAM
