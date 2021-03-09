export {};
const express = require("express");
const app = express();
const port = process.env.port ?? 5500;
const router = require("./router/routes");
const cors = require("cors");

// app.use(express.static(rootPath));
app.use(cors());
app.use("/todo", router);

app.listen(port, "0.0.0.0", console.log(`server up===>>>>>localhost:${port} `));
