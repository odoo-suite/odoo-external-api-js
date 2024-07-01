const express = require("express");
const router = express.Router();
const {
  getVersion,
  openConnection,
  createSession,
  refreshSession,
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
  if (payload instanceof Error) {
    return res.status(401).send({
      success: false,
      message: "Invalid credentials",
    });
  } else {
    res.status(200).json({
      payload: payload,
      success: true,
      message: "Connection",
    });
  }
});

router.post("/session", async (req, res) => {
  const fields = { ...req.body };
  const payload = await createSession(
    fields.database,
    fields.username,
    fields.password
  );
  if (payload instanceof Error) {
    return res.status(401).send({
      success: false,
      message: "Invalid credentials",
    });
  } else {
    res.status(200).json({
      payload: payload,
      success: true,
      message: "Session",
    });
  }
});

router.post("/refresh", async (req, res) => {
  const fields = { ...req.body };
  const { refresh } = fields;
  if (!refresh) {
    return res.status(401).send({
      success: false,
      message: "No refresh token provided",
    });
  } else {
    const payload = await refreshSession(refresh);
    if (payload instanceof Error) {
      return res.status(401).send({
        success: false,
        message: "Invalid refresh token",
      });
    } else {
      res.status(200).json({
        payload: payload,
        success: true,
        message: "Refresh",
      });
    }
  }
});

module.exports = router;
