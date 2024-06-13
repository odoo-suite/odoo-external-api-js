require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./src/routes/v1");

const enviroment = process.env.ENVIRONMENT || "development";
const port = parseInt(process.env.PORT || "3000") || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/api/v1", routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
