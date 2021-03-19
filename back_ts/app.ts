export {};
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const router = require("./router/routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoConnect = require("./db/mongo");

let jsonParser = bodyParser.json();

app.use(cors());
app.use("/todo", jsonParser, router);

app.listen(
  port,
  process.env.URL,
  console.log(`server up===>>>>>localhost:${port} `)
);

mongoConnect();
