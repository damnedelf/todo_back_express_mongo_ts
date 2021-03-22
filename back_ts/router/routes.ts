export {};
import { NextFunction, Request, Response } from "express";
let express = require("express");

const todo = require("../db/models/todo_model");

const router = express.Router();

//order for front
let orderN: number;
//new todo===>db
router.post(
  "/post",
  async function (req: Request, res: Response, next: NextFunction) {
    //get amount of docs in collection
    orderN = await todo.find().count();
    if (!orderN) next(new Error("access denied"));
    orderN++;
    //new obj for db
    let person = new todo({
      name: req.body.name,
      isCompleted: false,
      order: orderN,
    });

    let todoForRes: todoFromDb = await person.save();
    if (!todoForRes) next(new Error("access denied"));
    res.end(JSON.stringify(todoForRes));
  }
);
//get all array for onLoad
router.get(
  "/getall",
  async function (req: Request, res: Response, next: NextFunction) {
    let todoArr: todoFromDb[] = await todo.find({});
    if (!todoArr) next(new Error("access denied"));
    //sort by order for front
    todoArr.sort((a, b) => (a.order > b.order ? 1 : -1));
    res.end(JSON.stringify(todoArr));
  }
);
//delete todo by id
router.delete(
  "/delete",
  async function (req: Request, res: Response, next: NextFunction) {
    let removed = await todo.findOneAndRemove({ _id: req.body.id });
    if (!removed) next(new Error("access denied"));

    res.end();
  }
);
//mark completed/!completed by id
router.patch(
  "/patch",
  async function (req: Request, res: Response, next: NextFunction) {
    //looking for todo by id to get isCompleted Condition
    let todoObj: todoFromDb = await todo.findOne({ _id: req.body.id });
    if (!todoObj) next(new Error("access denied"));
    //find todo by id and switch isCompleted
    let result = await todo.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { isCompleted: !todoObj.isCompleted } }
    );
    if (!result) next(new Error("access denied"));

    res.end();
  }
);
//updates element order by id
router.patch(
  "/order_patch",
  async function (req: Request, res: Response, next: NextFunction) {
    let order = await todo.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { order: req.body.order } }
    );
    if (!order) next(new Error("access denied"));
    res.end();
  }
);
//switch all array`s isCompleted property by condition from front
router.put(
  "/put",
  async function (req: Request, res: Response, next: NextFunction) {
    let put = await todo.updateMany(
      {},
      { $set: { isCompleted: req.body.status } }
    );
    if (!put) next(new Error("access denied"));
    res.end();
  }
);

module.exports = router;
