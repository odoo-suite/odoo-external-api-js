require("dotenv").config();
const xmlrpc = require("xmlrpc");

const url = process.env.ODOO_URL;
const database = process.env.ODOO_DATABASE;
const username = process.env.ODOO_USERNAME;
const password = process.env.ODOO_PASSWORD;

const commonClient = xmlrpc.createClient({ url: `${url}/xmlrpc/2/common` });
const modelsClient = xmlrpc.createClient({ url: `${url}/xmlrpc/2/object` });

const version = async () => {
  console.log("Connecting to database...");
  try {
    const output = await new Promise((resolve, reject) => {
      commonClient.methodCall("version", [], (error, output) => {
        if (error) {
          console.error("Error:", error);
          reject(error);
        } else {
          resolve(output);
        }
      });
    });
    console.log("Version:", output);
    return output;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};

const connect = async () => {
  console.log("Connecting to database...");
  try {
    const output = await new Promise((resolve, reject) => {
      commonClient.methodCall(
        "authenticate",
        [database, username, password, {}],
        (error, output) => {
          if (error) {
            console.error("Error:", error);
            reject(error);
          } else {
            resolve(output);
          }
        }
      );
    });
    console.log("User ID:", output);
    return output;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};

const session = async (database, username, password) => {
  console.log("Connecting to database...");
  try {
    const output = await new Promise((resolve, reject) => {
      commonClient.methodCall(
        "authenticate",
        [database, username, password, {}],
        (error, output) => {
          if (error) {
            console.error("Error:", error);
            reject(error);
          } else {
            resolve(output);
          }
        }
      );
    });
    console.log("User ID:", output);
    return output;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};

const query = async (database, uid, password, fields) => {
  const { model, method, where, params } = fields;
  try {
    const output = await new Promise((resolve, reject) => {
      modelsClient.methodCall(
        "execute_kw",
        [database, uid, password, model, method, where, params],
        (error, output) => {
          if (error) {
            console.error("Error:", error);
            reject(error);
          } else {
            resolve(output);
          }
        }
      );
    });
    console.log("Result:", output);
    return output;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};

module.exports = {
  version,
  connect,
  session,
  query,
};
