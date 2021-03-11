export {};
const express = require("express");
const app = express();
const port = process.env.port ?? 5500;
const router = require("./router/routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoConnect = require("./db/mongo");
let jsonParser = bodyParser.json();
mongoConnect();
app.use(cors());
app.use("/todo", jsonParser, router);

app.listen(port, "0.0.0.0", console.log(`server up===>>>>>localhost:${port} `));
