const { query } = require("../config/connect");
const { crypto_decrypt } = require("../utils/crypto");

const queryController = async (session, fields) => {
  const { uid, database, password } = session;

  const payload = await query(
    crypto_decrypt(database),
    uid,
    crypto_decrypt(password),
    fields
  );
  return payload;
};

module.exports = { queryController };
