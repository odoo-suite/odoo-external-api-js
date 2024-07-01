const express = require("express");
const router = express.Router();

const testRouter = require("./test.router");
const queryRouter = require("./query.router");

const mapNavigationUrls = [
  {
    path: "/test",
    route: testRouter,
  },
  {
    path: "/query",
    route: queryRouter,
  },
];

mapNavigationUrls.forEach((item) => {
  router.use(item.path, item.route);
});

module.exports = router;
