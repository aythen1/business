const jwt = require("jsonwebtoken");
const { ClientError } = require("../../utils/err/errors");

const { getVector } = require("../../services/lancedb");

const encodeVector = (id) => {
  const str = `${id}`;
  const base64Str = btoa(str);
  return base64Str;
};

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new ClientError("Authorization token missing", 401);
    }

    const decodedToken = jwt.verify(
      token,
      "keySecret156754asdas897fav45646xz4c65z899sa4fa654fas65f4sa65sadasf" // nfc
    );

    const ID = "test/test";
    const path = encodeVector(ID);

    const options = [
      { field: "id", operator: "==", value: decodedToken.id },
      { field: "user", operator: "==", value: decodedToken.user },
      { field: "isverified", operator: "==", value: true },
    ];

    const resp = await getVector(path, "users", [0, 0], options);
    delete resp[0].avatar;

    if (resp.length == 0) {
      throw new ClientError("User not found", 404);
    }

    req.user = resp[0];
    next();
  } catch (error) {
    console.log("Invalid token: ", error);
    // next(error)
    // throw new ClientError('Invalid token', 401)
    return res.status(501).send("Invalid token");
  }
};

module.exports = { authenticateToken: authenticateToken };
