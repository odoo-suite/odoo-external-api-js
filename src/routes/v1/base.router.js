const express = require("express");
const router = express.Router();
const {
  getVersion,
  openConnection,
  createSession,
} = require("../../controllers/base.controller");

router.get("/", async (req, res) => {
  const payload = await getVersion();
  res.status(200).json({
    payload: payload,
    success: true,
    message: "Version",
  });
});

// Se recomienda desactivar esta ruta
router.get("/connection", async (req, res) => {
  const payload = await openConnection();
  res.status(200).json({
    payload: payload,
    success: true,
    message: "Connection",
  });
});

router.post("/session", async (req, res) => {
  const fields = { ...req.body };
  const payload = await createSession(
    fields.database,
    fields.username,
    fields.password
  );
  res.status(200).json({
    payload: payload,
    success: true,
    message: "Session",
  });
});

module.exports = router;
