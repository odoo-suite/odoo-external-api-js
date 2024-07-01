const jwt = require("jsonwebtoken");
const { version, connect, session } = require("../config/connect");
const { crypto_encrypt, crypto_decrypt } = require("../utils/crypto");

const getVersion = async () => {
  const payload = await version();
  return payload;
};

const openConnection = async () => {
  const payload = await connect();
  return payload;
};

const createSession = async (database, username, password) => {
  const db = crypto_decrypt(database);
  const user = crypto_decrypt(username);
  const pass = crypto_decrypt(password);

  const result = await session(db, user, pass);

  const data_access_token = {
    uid: result,
    database: database,
    username: username,
    password: password,
  };

  const access_token = jwt.sign(data_access_token, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  const data_refresh_token = {
    database: database,
    username: username,
    password: password,
  };

  const refresh_token = jwt.sign(data_refresh_token, process.env.JWT_SECRET);

  const payload = {
    access_token: access_token,
    refresh_token: refresh_token,
    uid: result,
  };

  return payload;
};

module.exports = {
  getVersion,
  openConnection,
  createSession,
};
