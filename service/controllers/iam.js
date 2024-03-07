const { catchedAsync, response } = require("../utils/err");
const jwt = require("jsonwebtoken");
const { ClientError } = require("../utils/err/errors");

// const crypto = require('crypto');
// const sendmail = require('sendmail')();

// API SOAP

const {
  addVector,
  updateVector,
  getVector,
  deleteVector,
  removeVector,
} = require("../services/lancedb");

const { sendEmail } = require("../services/email");

const addons = require("../middlewares/default/addons");
const gpts = require("../middlewares/default/gpts");
const changelogs = require("../middlewares/default/changelogs");
const news = require("../middlewares/default/news");

const ID = "test/test";
const secretKey =
  "keySecret156754asdas897fav45646xz4c65z899sa4fa654fas65f4sa65sadasf";

const encodeVector = (id) => {
  const str = `${id}`;
  const base64Str = btoa(str);
  return base64Str;
};

function generateToken(payload) {
  // Firma el token con la clave secreta y establece un tiempo de expiración (por ejemplo, 1 hora)
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return token;
}

function decodeToken(token) {
  try {
    // Decodifica el token utilizando la clave secreta
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    // Maneja errores de decodificación, por ejemplo, token no válido o expirado
    console.error("Error al decodificar el token:", error.message);
    return null;
  }
}

// ------------------------------------------------------

const fetchsDefault = async (req, res, next) => {
  try {
    const path = encodeVector(ID);

    const respAddons = await getVector(path, "default_addons");
    const respGpts = await getVector(path, "default_gpts");
    const respChangelogs = await getVector(path, "default_changelogs");
    const respNews = await getVector(path, "default_news");

    let resAddons = respAddons;
    if (!(typeof respAddons == "object" && respAddons.length)) {
      resAddons = await addVector(path, "default_addons", [0, 0], addons);
    }

    let resGpts = respGpts;
    if (!(typeof respGpts == "object" && respGpts.length)) {
      resGpts = await addVector(path, "default_gpts", [0, 0], gpts);
    }

    let resChangelogs = respChangelogs;
    if (!(typeof respChangelogs == "object" && respChangelogs.length)) {
      resChangelogs = await addVector(
        path,
        "default_changelogs",
        [0, 0],
        changelogs
      );
    }

    let resNews = respNews;
    if (!(typeof respNews == "object" && respNews.length)) {
      resNews = await addVector(path, "default_news", [0, 0], news);
    }

    return res.status(200).send({
      addons: resAddons,
      gpts: resGpts,
      changelogs: resChangelogs,
      news: resNews,
    });
  } catch (err) {
    return res.satus(500).send(err);
  }
};

const updateDefault = async (req, res, next) => {
  try {
    const path = encodeVector(ID);
    const { table, data } = req.body;

    console.log("update default", table, data);

    const resp = await updateVector(path, `default_${table}`, [0, 0], data);

    if (resp == 400) {
      return res.satus(400).send("Not found");
    }

    return res.status(200).send({
      table: table,
      data: resp,
    });
  } catch (err) {
    return res.satus(500).send(err);
  }
};

const fetchsBilling = async (req, res, next) => {
  try {
    console.log("11234");
    const { user } = req;
    const path = encodeVector(ID);
    // ---------------------------------------------------------
    // tests() {
    //   description
    // }
    const options = `
   query {
    users(id: ${user.id}) {
      user
      password
      upgradedat
      createdat
      isverified
      billings(limit: 5) {
        id
        type
        name
        email
        limit
        iban
        currency
        vat
        paymentmethod
        address
        upgradedat
        createdat
      }
    }
  }`;

    // console.log('res', options)

    const resp = await getVector(path, options, [0, 0]);

    return res.status(200).send(resp);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const updateBilling = async (req, res, next) => {
  try {
    const { user } = req;
    const { billing } = req.body;
    const path = encodeVector(ID);

    // console.log('billliiingg', payload)

    const resp = await updateVector(path, "billings", [0, 0], billing, {
      users: user,
    });

    // var data = {
    //   title: 'title',
    //   description: 'description',
    // }
    // const _resp = await addVector(path, 'tests', [0, 0], data, { users: user, billings: resp[0] })

    console.log("resp", resp);
    // console.log('_resp', _resp)

    return res.status(200).send(resp[0]);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const fetchsInvoice = async (req, res) => {
  try {
    const path = encodeVector(ID);

    const data = await getVector(path, "invoices");
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const fetchInvoice = async (req, res) => {
  try {
    const path = encodeVector(ID);

    const data = await getVector(path, "invoices");
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.body;
    const path = encodeVector(ID);
    // console.log('ed9iew2udh', id)
    const resp = await deleteVector(path, "invoices", id);
    console.log("resp", resp);

    return res.status(200).send(id);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const addInvoice = async (req, res) => {
  try {
    const { user } = req;
    const { invoice } = req.body;

    const path = encodeVector(ID);

    console.log("apps", result, invoice);
    const resp = await addVector(path, "invoices", [0, 0], invoice, {
      users: user,
    });
    // console.log('re', resp)
    return res.status(200).send(resp[0]);
  } catch (err) {
    console.log("Error ", err);
  }
};

const updateInvoice = async (req, res, next) => {
  try {
    const { invoice } = req.body;

    // user.id = payload.id
    // const user = await models.UserModel.findOne({ where: { email } })
    // id, name, vector = [1.3, 1.4], data, overwrite = false
    const path = encodeVector(ID);

    const resp = await updateVector(path, "invoices", [0, 0], invoice, false);

    const _token = await generateToken(resp);

    if (resp.isverified) {
      // response(res, 200, )
      return res.status(200).send({ invoice: resp, token: _token });
    } else {
      return res.status(201).send({ message: 500 });
      // response(res, 201, { message: 500 })
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

const confirmUser = async (req, res, next) => {
  try {
    const { token } = req.body;
    console.log("token", token);
    const payload = await decodeToken(token);
    const path = encodeVector(ID);

    const data = {
      id: payload.id,
      isverified: true,
    };

    const resp = await updateVector(path, "users", [0, 0], data, false);
    console.log("resp", resp);

    const _token = await generateToken(resp);

    // response(res, 200, { user: resp, token: _token })
    return res.status(200).send({ user: resp, token: _token });
  } catch (err) {
    // const _resp = await addVector(path, 'users', [0, 0], data, false)

    return res.status(301).send({ message: 301 });
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const { user } = req;
    const { token } = req.body;

    return res.status(200).send({ user, token });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const avatarUser = async (req, res) => {
  const { id } = req.params;
  const path = encodeVector(ID);

  console.log("iddd", id);

  // const options = `
  //   query {
  //    users(id: ${id}) {
  //      avatar
  //  }`

  // const resp = await getVector(path, 'users', [0, 0], options)

  const conditions = [{ field: "id", operator: "==", value: id }];

  const resp = await getVector(path, "users", [0, 0], conditions, false);

  if (resp.length == 0) {
    throw "Not exist user";
  }

  const base64Image = resp[0].avatar;
  // console.log('base64Image', base64Image)

  // Verifica si el dato es válido antes de enviarlo
  if (!base64Image || !/^data:image\/\w+;base64,/.test(base64Image)) {
    res.status(402).send("Formato de imagen no válido");
    return;
  }

  // Extrae el tipo de contenido de la imagen (png, jpeg, etc.)
  const contentType = base64Image.split(";")[0].split(":")[1];

  // Convierte el formato base64 a Buffer
  const imageBuffer = Buffer.from(base64Image.split(",")[1], "base64");

  // Establece las cabeceras de la respuesta con el tipo de contenido
  res.writeHead(200, {
    "Content-Type": contentType,
    "Content-Length": imageBuffer.length,
  });

  // Envía la imagen en formato Buffer como respuesta
  res.end(imageBuffer);
};

const updateUser = async (req, res, next) => {
  try {
    const { user } = req;
    const { user: _user } = req.body;
    _user.id = user.id;

    const path = encodeVector(ID);
    const resp = await updateVector(path, "users", [0, 0], _user, false);

    delete resp.avatar;
    console.log("rrres", resp);

    const _token = await generateToken(resp);

    if (resp.isverified) {
      // response(res, 200, { user: resp, token: _token })
      return res.status(200).send({ user: resp, token: _token });
    } else {
      // response(res, 201, { message: 500 })
      return res.status(201).send({ message: 500 });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

const decoderUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new ClientError("Token not provided", 401);
    }
    const decodedToken = jwt.verify(
      token,
      "keySecret156754asdas897fav45646xz4c65z899sa4fa654fas65f4sa65sadasf"
    );
    const userEmail = decodedToken.email;
    const user = await models.UserModel.findOne({
      where: { email: userEmail },
    });
    if (!user) {
      throw new ClientError("User not found", 404);
    }
    response(res, 200, user);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { path, user, password } = req.body;

    const options = [
      { field: "user", operator: "==", value: user },
      { field: "password", operator: "==", value: password },
    ];

    const _user = await getVector(path, "users", [0, 0], options);
    if (_user.error) {
      return res.status(500).send({ message: _user.error });
    }

    if (_user.length == 0) {
      return res.status(500).send({ message: "User not found by email" });
    }

    const data = _user[0];
    // avatar
    delete data.avatar;

    const token = await generateToken(data);

    if (data.isverified !== true) {
      // resend email confirm email
      // const email = sendEmail('info@aythen.com', 'confirm-email', { token })
      return res.status(301).send({ message: 301 });
    } else {
      return res.status(200).send({
        token,
        user: data,
      });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

const registerUser = async (req, res, next) => {
  try {
    // const user = await models.UserModel.findOne({ where: { email } })
    // id, name, vector = [1.3, 1.4], data, overwrite = false
    const { path, user, password } = req.body;

    const conditions = [{ field: "user", operator: "==", value: user }];

    const resp = await getVector(path, "users", [0, 0], conditions, false);

    if (resp.length > 0) {
      // throw new ClientError('User ya existe ' + JSON.stringify(resp.exist), 400)
      return res.status(400).send("User already exist");
    }

    if (resp.error) {
      throw new ClientError(resp.error, 500);
    }

    const data = {
      user: user,
      password: password,
      isverified: false,
      upgradedat: new Date(
        new Date().getTime() - 24 * 60 * 60 * 1000
      ).toISOString(),
    };

    const _resp = await addVector(path, "users", [0, 0], data, false);

    const token = generateToken(_resp[0]);

    const email = sendEmail(user, "confirm-email", { token });

    // response(res, 200, { token: 'Success' })
    return res.status(200).send({ token: "Success" });
  } catch (err) {
    return res.status(500).send(err);
  }
};
const upgradeUser = async (req, res, next) => {
  console.log("1234566");
  try {
    const { user } = req;
    const { upgradedat } = req.body;
    const path = encodeVector(ID);

    const data = {
      id: user.id,
      upgradedat: upgradedat,
    };

    console.log("eee", data);

    const _resp = await updateVector(path, "users", [0, 0], data, false);

    const email = sendEmail(user.email, "start-premium");

    // response(res, 200, {
    //   token: generateToken(_resp),
    //   user: _resp
    // })

    return res.status(200).send({
      token: generateToken(_resp),
      user: _resp,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const recoverPasswordUser = async (req, res, next) => {
  try {
    const { path, email } = req.body;

    const options = [{ field: "user", operator: "==", value: email }];

    //path

    const resp = await getVector(path, "users", [0, 0], options, false);

    if (resp.error) {
      throw new ClientError(resp.error, 500);
    }

    if (resp.length == 0) {
      console.log("wfrf");
      // throw new ClientError(resp.error, 500)

      return res.status(400).send({ message: "Not found user" });
    }

    const user = resp[0];
    const token = generateToken(user);

    sendEmail(email, "recover-password", { token });
    // response(res, 200, { message: 'Send Email' })
    return res.status(200).send({ message: "Send Email" });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const updatePasswordUser = async (req, res, next) => {
  try {
    console.log("123456");
    const { user } = req;
    const { password } = req.body;

    console.log("usertoekn, ", user.user);
    let _user = user;
    _user.password = password;

    console.log("_token", _user);

    const path = encodeVector(ID);

    const resp = await updateVector(path, "users", [0, 0], _user, false);

    const token = generateToken(resp);

    // console.log('resp', resp)
    // response(res, 200, {
    //   user: resp,
    //   token: __token
    // })
    return res.status(200).send({
      user: resp,
      token: token,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

// --------------------------------------
const shareFile = async (req, res) => {
  const { user } = req;

  const resp = await addVector(path, "users", [0, 0], data, false);
};

const addUser = async (req, res) => {
  try {
    const { user, tags, group } = req.body;

    const arr = [];
    const path = encodeVector(ID);

    for (var i = 0; i < user.length; i++) {
      let data = {
        user: user[i],
        password: "1234",
        isverified: true,
      };

      const resp = await addVector(path, "users", [0, 0], data, false);
      console.log("re", resp);
      arr.push(resp);
    }

    return res.status(200).send(arr);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    const path = encodeVector(ID);

    console.log("ed9iew2udh", id);
    const resp = await deleteVector(path, "users", id);

    console.log("resp", resp);

    return res.status(200).send(id);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const fetchsUser = async (req, res) => {
  try {
    const path = encodeVector(ID);
    const order = req.query.order;
    console.log("controller", { path, order });
    let conditions = [];

    if (order) {
      conditions = [
        { field: order.param, operator: "!==", value: "%", order: order.type },
      ];
    }

    console.log("controller", { conditions });

    const data = await getVector(path, "users", [0, 0], conditions);
    console.log("controller", { data });
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const addApplication = async (req, res) => {
  try {
    const { user } = req;
    const { application } = req.body;

    console.log("adddd", application);

    const path = encodeVector(ID);

    console.log("apps", application);
    const resp = await addVector(path, "applications", [0, 0], application, {
      users: user,
    });
    console.log("re", resp);
    return res.status(200).send(resp);
  } catch (err) {
    console.log("Error ", err);
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.body;

    const path = encodeVector(ID);

    const resp = await deleteVector(path, "applications", id);

    console.log("resp", resp);

    return res.status(200).send(id);
  } catch (err) {
    console.log("Error ", err);
  }
};

const fetchsApplication = async (req, res) => {
  try {
    const path = encodeVector(ID);

    const data = await getVector(path, "applications");
    return res.status(200).send(data);
  } catch (err) {
    return res.status(200).send([]);
  }
};

const addPolice = async (req, res) => {
  try {
    const { user } = req;
    const { police } = req.body;

    const path = encodeVector(ID);

    const resp = await addVector(path, "polices", [0, 0], police, {
      users: user,
    });
    return res.status(200).send(resp);
  } catch (err) {
    console.log("err", err);
  }
};

const deletePolice = async (req, res) => {
  try {
    const { id } = req.body;

    const path = encodeVector(ID);

    const resp = await deleteVector(path, "polices", id);

    console.log("resp", resp);

    return res.status(200).send(id);
  } catch (err) {
    console.log("err", err);
  }
};

const fetchsPolice = async (req, res) => {
  try {
    const path = encodeVector(ID);

    const data = await getVector(path, "polices");
    if (Array.isArray(data)) {
      return res.status(200).send(data);
    }
  } catch (err) {
    return res.status(200).send([]);
  }
};

const addApi = async (req, res) => {
  try {
    const { api } = req.body;

    const path = encodeVector(ID);

    const resp = await addVector(path, "apis", [0, 0], api, false);
    console.log("re", resp);
    return res.status(200).send(resp);
  } catch (err) {
    return res.status(200).send([]);
  }
};

const deleteApi = async (req, res) => {
  try {
    const { id } = req.body;

    const path = encodeVector(ID);

    const resp = await deleteVector(path, "apis", id);

    console.log("resp", resp);

    return res.status(200).send(id);
  } catch (err) {
    return res.status(200).send([]);
  }
};

const fetchsApi = async (req, res) => {
  try {
    const path = encodeVector(ID);

    const data = await getVector(path, "apis");
    if (Array.isArray(data)) {
      return res.status(200).send(data);
    } else {
      return res.status(200).send([]);
    }
  } catch (err) {
    return res.status(200).send([]);
  }
};

const addLog = async (req, res) => {
  try {
    const { user } = req;
    const { log, options } = req.body;

    const path = encodeVector(ID);

    const email = sendEmail("info@aythen.com", "confirm-email", {
      backgroundColor: options?.backgroundColor || "red",
    });

    const resp = await addVector(path, "logs", [0, 0], log, { users: user });
    return res.status(200).send(resp);
  } catch (err) {
    console.log("err", err);
  }
};

const deleteLog = async (req, res) => {
  try {
    const { id } = req.body;

    const path = encodeVector(ID);

    const resp = await deleteVector(path, "logs", id);

    console.log("resp", resp);

    return res.status(200).send(id);
  } catch (err) {
    console.log("err", err);
  }
};

const deleteLogs = async (req, res) => {
  try {
    const { id } = req.body;

    const path = encodeVector(ID);
    const resp = await removeVector(path, "logs");

    return res.status(200).send(id);
  } catch (err) {
    console.log("err", err);
  }
};

const fetchsLog = async (req, res) => {
  try {
    const path = encodeVector(ID);

    const data = await getVector(path, "logs");
    if (Array.isArray(data)) {
      return res.status(200).send(data);
    }
  } catch (err) {
    console.log("err", err);
  }
};

const sendMail = async (req, res, next) => {
  try {
    // const { path, user, password } = req.body
    const { email } = req.body;
    console.log("senddd email");
    let template = email || "confirm-email";

    const resp = sendEmail("info@aythen.com", template, { token: "1234" });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  fetchsDefault: catchedAsync(fetchsDefault),
  updateDefault: catchedAsync(updateDefault),

  fetchsBilling: catchedAsync(fetchsBilling),
  updateBilling: catchedAsync(updateBilling),

  fetchsInvoice: catchedAsync(fetchsInvoice),
  fetchInvoice: catchedAsync(fetchInvoice),
  deleteInvoice: catchedAsync(deleteInvoice),
  addInvoice: catchedAsync(addInvoice),
  updateInvoice: catchedAsync(updateInvoice),

  confirmUser: catchedAsync(confirmUser),
  verifyUser: catchedAsync(verifyUser),
  decoderUser: catchedAsync(decoderUser),
  loginUser: catchedAsync(loginUser),
  registerUser: catchedAsync(registerUser),
  upgradeUser: catchedAsync(upgradeUser),
  avatarUser: catchedAsync(avatarUser),
  updateUser: catchedAsync(updateUser),
  recoverPasswordUser: catchedAsync(recoverPasswordUser),
  updatePasswordUser: catchedAsync(updatePasswordUser),

  addUser: catchedAsync(addUser),
  deleteUser: catchedAsync(deleteUser),
  fetchsUser: catchedAsync(fetchsUser),
  shareFile: catchedAsync(shareFile),

  addApplication: catchedAsync(addApplication),
  deleteApplication: catchedAsync(deleteApplication),
  fetchsApplication: catchedAsync(fetchsApplication),

  addPolice: catchedAsync(addPolice),
  deletePolice: catchedAsync(deletePolice),
  fetchsPolice: catchedAsync(fetchsPolice),

  addApi: catchedAsync(addApi),
  deleteApi: catchedAsync(deleteApi),
  fetchsApi: catchedAsync(fetchsApi),

  addLog: catchedAsync(addLog),
  deleteLog: catchedAsync(deleteLog),
  deleteLogs: catchedAsync(deleteLogs),
  fetchsLog: catchedAsync(fetchsLog),

  sendMail: catchedAsync(sendMail),
};
