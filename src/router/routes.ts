import { NextFunction, Request, Response } from 'express';
let express = require('express');

const todo = require('../db/models/todo_model');

const router = express.Router();

//order for front
let orderN: number;
//new todo===>db
router.post(
  '',
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      // orderN = await todo.find().countDocuments();
      // orderN++;
      let person = new todo({
        name: req.body.name,
        isCompleted: false,
        order: req.body.order,
      });

      let todoForRes: todoFromDb = await person.save();
      res.status(201).json(todoForRes);
    } catch (error) {
      console.log(error);
      next(new Error('access denied'));
    }
    //get amount of docs in collection
  }
);
//get all array for onLoad
router.get(
  '',
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      let todoArr: todoFromDb[] = await todo.find({}).sort({ order: 1 });
      res.status(200).json(todoArr);
    } catch (error) {
      console.log(error);
      next(new Error('access denied'));
    }
  }
);
//delete todo by id
router.delete(
  '',
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      await todo.findOneAndRemove({ _id: req.body.id });
      res.status(204).end();
    } catch (error) {
      console.log(error);
      next(new Error('access denied'));
    }
  }
);
//mark completed/!completed by id + update all + order
router.patch(
  '',
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      //if req  => order
      if (req.body.order !== null && req.body.condition == null) {
        await todo.findOneAndUpdate(
          { _id: req.body.id },
          { $set: { order: req.body.order } }
        );

        res.status(204).end();
        //if req => mark all
      } else if (req.body.id == null) {
        await todo.updateMany(
          {},
          { $set: { isCompleted: !req.body.condition } }
        );

        res.status(204).end();
      }
      //if req mark one
      else {
        let todoObj: todoFromDb = await todo.findOne({ _id: req.body.id });

        //find todo by id and switch isCompleted
        await todo.findOneAndUpdate(
          { _id: req.body.id },
          { $set: { isCompleted: !todoObj.isCompleted } }
        );

        res.set({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        });
        res.status(204).end();
      }
    } catch (error) {
      console.log(error);
      next(new Error('access denied'));
    }
  }
);

module.exports = router;
