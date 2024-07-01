const { verify } = require("jsonwebtoken");

module.exports = {
  checkAuth: (req, res, next) => {
    let token = req.get("authorization");
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    } else {
      token = token.slice(7);
      verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            success: false,
            message: "Invalid token",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  },
};
