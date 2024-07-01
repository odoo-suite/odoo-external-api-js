const express = require("express");
const router = express.Router();
const { checkAuth } = require("../../middlewares/check.auth");

const { queryController } = require("../../controllers/query.controller");

router.post("/", checkAuth, async (req, res) => {
  const fields = { ...req.body };
  const session = req.decoded;
  const payload = await queryController(session, fields);
  res.status(200).json({
    payload: payload,
    success: true,
    message: "Query",
  });
});

module.exports = router;
