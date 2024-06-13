const express = require("express");
const router = express.Router();

const testRouter = require("./test.router");

const mapNavigationUrls = [
  {
    path: "/test",
    route: testRouter,
  },
];

mapNavigationUrls.forEach((item) => {
  router.use(item.path, item.route);
});

module.exports = router;
