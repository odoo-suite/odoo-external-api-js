const express = require("express");
const router = express.Router();

const testRouter = require("./base.router");
const queryRouter = require("./query.router");

const mapNavigationUrls = [
  {
    path: "/base",
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
