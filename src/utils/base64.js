const utf8_to_b64 = (str) => {
  const buff = Buffer.from(str);
  return buff.toString("base64");
};

const b64_to_utf8 = (str) => {
  const buff = Buffer.from(str, "base64");
  return buff.toString("utf8");
};

module.exports = { utf8_to_b64, b64_to_utf8 };
