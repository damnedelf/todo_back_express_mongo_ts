export {};
import { Request, Response } from "express";
let express = require("express");
const todo = require("../db/models/todo_model");

const router = express.Router();

//order for front
let orderN: number;
//new todo===>db
router.post("/post", async function (req: Request, res: Response) {
  // any array in db
  let todoArr: todoFromDb[] = await todo.find({});
  //order counter
  if (todoArr.length === 0) {
    orderN = 0;
  } else {
    todoArr.sort((a, b) => (a.order > b.order ? 1 : -1));
    orderN = todoArr[todoArr.length - 1].order;
  }
  orderN++;
  //new obj for db
  let person = new todo({
    name: req.body.name,
    isCompleted: false,
    order: orderN,
  });

  try {
    let todo: todoFromDb = await person.save();
    res.end(JSON.stringify(todo));
  } catch (error) {
    console.log(`response//on post err==>> ${error}`);
    res.write(`post error ==>${error}`);
    res.end();
  }
});
//get all array for onLoad
router.get("/getall", async function (req: Request, res: Response) {
  try {
    let todoArr: todoFromDb[] = await todo.find({});
    //sort by order for front
    todoArr.sort((a, b) => (a.order > b.order ? 1 : -1));
    res.end(JSON.stringify(todoArr));
  } catch (error) {
    res.write(`get array from db ${error}`);
    res.end();
  }
});
//delete todo by id
router.delete("/delete", async function (req: Request, res: Response) {
  try {
    await todo.findOneAndRemove({ _id: req.body.id });
    res.end();
  } catch (error) {
    res.write(`error delete ${error}`);
    res.end();
  }
});
//mark completed/!completed by id
router.patch("/patch", async function (req: Request, res: Response) {
  try {
    //looking for todo by id to get isCompleted Condition
    let todoObj: todoFromDb = await todo.findOne({ _id: req.body.id });
    //find todo by id and switch isCompleted
    await todo.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { isCompleted: !todoObj.isCompleted } }
    );
    res.end();
  } catch (error) {
    res.write(`error patch====>>>>${error}`);
    res.end();
  }
});
//updates element order by id
router.patch("/order_patch", async function (req: Request, res: Response) {
  try {
    await todo.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { order: req.body.order } }
    );
    res.end();
  } catch (error) {
    res.write(`error patch====>>>>${error}`);
    res.end();
  }
});
//switch all array`s isCompleted property by condition from front
router.put("/put", async function (req: Request, res: Response) {
  try {
    await todo.updateMany({}, { $set: { isCompleted: req.body.status } });
    res.end();
  } catch (error) {
    res.write(`all updated error ${error}`);
    res.end();
  }
});
module.exports = router;
