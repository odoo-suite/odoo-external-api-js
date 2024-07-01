const CryptoJS = require("crypto-js");

const CRYPTO_PASSWORD = process.env.CRYPTO_PASSWORD;
const CRYPTO_SALT = process.env.CRYPTO_SALT;
const CRYPTO_KEYSIZE = process.env.CRYPTO_KEYSIZE;
const CRYPTO_ITERATIONS = process.env.CRYPTO_ITERATIONS;

const crypto_encrypt = (str) => {
  let bytes = CryptoJS.PBKDF2(CRYPTO_PASSWORD, CRYPTO_SALT, {
    keySize: CRYPTO_KEYSIZE,
    iterations: CRYPTO_ITERATIONS,
  });

  let iv = CryptoJS.enc.Hex.parse(bytes.toString().slice(0, 32));
  let key = CryptoJS.enc.Hex.parse(bytes.toString().slice(32, 96));

  let ciphertext = CryptoJS.AES.encrypt(str, key, { iv });
  return ciphertext.toString();
};

const crypto_decrypt = (str) => {
  let bytes = CryptoJS.PBKDF2(CRYPTO_PASSWORD, CRYPTO_SALT, {
    keySize: CRYPTO_KEYSIZE,
    iterations: CRYPTO_ITERATIONS,
  });
  let iv = CryptoJS.enc.Hex.parse(bytes.toString().slice(0, 32));
  let key = CryptoJS.enc.Hex.parse(bytes.toString().slice(32, 96));

  let ciphertext = CryptoJS.AES.decrypt(str, key, { iv });
  let txt = ciphertext.toString(CryptoJS.enc.Utf8);
  return txt;
};

module.exports = { crypto_encrypt, crypto_decrypt };
