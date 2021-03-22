import { NextFunction, Request, Response } from "express";

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

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  if (err.message === "access denied") {
    res.status(err.status);
    res.json({ error: err.message });
  }
});
app.get("*", (req: Request, res: Response) => {
  res
    .status(404)
    .send(`<h1> Page http://localhost${req.url} doesn\`t exist</h1>`);
});

app.listen(
  port,
  process.env.URL,
  console.log(`server up===>>>>>${process.env.URL}:${port} `)
);

mongoConnect();
