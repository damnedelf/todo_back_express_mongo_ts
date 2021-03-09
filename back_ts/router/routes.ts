import { Request, Response } from "express";
import { InsertManyResult } from "mongoose";

export {};
let express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { nanoid } = require("nanoid");

const mongoose = require("mongoose");
const todo = require("../models/todo_model");
let textParser = bodyParser.text();
let jsonParser = bodyParser.json();
let urlenParser = bodyParser.urlencoded();
mongoose.connect("mongodb://localhost/toDoCollection", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection
  .once("open", function () {
    console.log("connection to db is up");
  })
  .on("error", function (error: Error) {
    console.log("error>>>>>>", error);
  });

router.post("/post", jsonParser, function (req: Request, res: Response) {
  let person = new todo({
    name: req.body.name,
    id: nanoid(),
    isCompleted: false,
  });

  try {
    let currentTodo = {
      name: person.name,
      id: person.id,
      isCompleted: person.isCompleted,
    };
    person.save().then(res.end(JSON.stringify(currentTodo)));
  } catch (error) {
    res.write(`Some error ${error}`);
    res.end();
  }
});
router.get("/getall", function (req: Request, res: Response) {
  try {
    todo.find({}).then(function (result: InsertManyResult) {
      res.end(JSON.stringify(result));
    });
  } catch (error) {
    res.write(`get array from db ${error}`);
    res.end();
  }
});
router.delete("/delete", jsonParser, function (req: Request, res: Response) {
  try {
    todo.findOneAndRemove({ id: req.body.id }).then(() => res.end());
  } catch (error) {
    res.write(`error ${error}`);
    res.end();
  }
});
router.patch("/patch", jsonParser, function (req: Request, res: Response) {
  try {
    todo.findOne({ id: req.body.id }).then(function (result: todoFromMongo) {
      todo
        .findOneAndUpdate(
          { id: req.body.id },
          { $set: { isCompleted: !result.isCompleted } }
        )
        .then(() => res.end());
    });
  } catch (error) {
    res.write(`error ${error}`);
    res.end();
  }
});
router.put("/put", jsonParser, function (req: Request, res: Response) {
  try {
    todo
      .updateMany({}, { $set: { isCompleted: req.body.status } })
      .then(() => res.end());
  } catch (error) {
    res.write(`all updated error ${error}`);
    res.end();
  }
});
module.exports = router;
