const CryptoJS = require("crypto-js");
const { utf8_to_b64, b64_to_utf8 } = require("./base64");

const CRYPTO_PASSWORD = process.env.CRYPTO_PASSWORD;
const CRYPTO_SALT = process.env.CRYPTO_SALT;
const CRYPTO_KEYSIZE = parseInt(process.env.CRYPTO_KEYSIZE, 10);
const CRYPTO_ITERATIONS = parseInt(process.env.CRYPTO_ITERATIONS, 10);

const crypto_encrypt = (str) => {
  let bytes = CryptoJS.PBKDF2(CRYPTO_PASSWORD, CRYPTO_SALT, {
    keySize: CRYPTO_KEYSIZE / 32,
    iterations: CRYPTO_ITERATIONS,
  });

  let iv = CryptoJS.enc.Hex.parse(bytes.toString().slice(0, 32));
  let key = CryptoJS.enc.Hex.parse(bytes.toString().slice(32, 96));

  let ciphertext = CryptoJS.AES.encrypt(utf8_to_b64(str), key, { iv });
  return ciphertext.toString();
};

const crypto_decrypt = (str) => {
  let bytes = CryptoJS.PBKDF2(CRYPTO_PASSWORD, CRYPTO_SALT, {
    keySize: CRYPTO_KEYSIZE / 32,
    iterations: CRYPTO_ITERATIONS,
  });
  let iv = CryptoJS.enc.Hex.parse(bytes.toString().slice(0, 32));
  let key = CryptoJS.enc.Hex.parse(bytes.toString().slice(32, 96));

  let ciphertext = CryptoJS.AES.decrypt(str, key, { iv });
  let txt = ciphertext.toString(CryptoJS.enc.Utf8);
  return b64_to_utf8(txt);
};

module.exports = { crypto_encrypt, crypto_decrypt };
