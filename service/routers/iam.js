const { Router } = require("express");
const routerIAM = Router();

const { authenticateToken } = require("../middlewares/auth/auth");

const {
  fetchsDefault,
  updateDefault,

  fetchsBillingExpenses,
  
  fetchsBilling,
  updateBilling,

  fetchsInvoice,
  fetchInvoice,
  deleteInvoice,
  addInvoice,
  updateInvoice,

  confirmUser,
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
  shareFile,

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
  deleteLogs,
  fetchsLog,

  sendMail,
} = require("../controllers/iam");

routerIAM
  .post("/load/default", authenticateToken, fetchsDefault)
  .put("/load/default", authenticateToken, updateDefault)


  .get("/billing/expenses", authenticateToken, fetchsBillingExpenses)

  .get("/billing/fetchs", authenticateToken, fetchsBilling)
  .post("/billing/update", authenticateToken, updateBilling)

  .get("/billing/invoices", authenticateToken, fetchsInvoice)
  .get("/billing/invoice/:id", authenticateToken, fetchInvoice)
  .delete("/billing/invoice", authenticateToken, deleteInvoice)
  .post("/billing/invoice", authenticateToken, addInvoice)
  .put("/billing/invoice", authenticateToken, updateInvoice)

  .post("/user/confirm", confirmUser)
  .post("/user/verify", authenticateToken, verifyUser)
  .post("/user/decode", authenticateToken, decoderUser)
  .post("/user/login", loginUser)
  .post("/user/register", registerUser)

  .post("/user/upgrade", authenticateToken, upgradeUser)
  .post("/user", authenticateToken, updateUser)
  .post("/user/recover-password", recoverPasswordUser)
  .post("/user/password", authenticateToken, updatePasswordUser)

  .post("/user/add-user", authenticateToken, addUser)
  .post("/user/delete-user", authenticateToken, deleteUser)
  .get("/user/all-user", authenticateToken, fetchsUser)
  .get("/user/share-file", authenticateToken, shareFile)
  .get("/user/:id", avatarUser)

  .post("/application/add-application", authenticateToken, addApplication)
  .post("/application/delete-application", authenticateToken, deleteApplication)
  .get("/application/all-application", authenticateToken, fetchsApplication)

  .post("/police/add-police", authenticateToken, addPolice)
  .post("/police/delete-police", authenticateToken, deletePolice)
  .get("/police/all-police", authenticateToken, fetchsPolice)

  .post("/api/add-api", authenticateToken, addApi)
  .post("/api/delete-api", authenticateToken, deleteApi)
  .get("/api/all-api", authenticateToken, fetchsApi)

  .post("/log/add-log", authenticateToken, addLog)
  .post("/log/delete-log", authenticateToken, deleteLog)
  .post("/log/delete-logs", authenticateToken, deleteLogs)
  .get("/log/all-log", authenticateToken, fetchsLog)

  .post("/send/mail", authenticateToken, sendMail);

module.exports = routerIAM;
