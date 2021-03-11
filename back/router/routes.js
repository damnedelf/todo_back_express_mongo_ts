"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let express = require("express");
const router = express.Router();
const todo = require("../db/models/todo_model");
let orderN;
router.post("/post", async function (req, res) {
    let todoArr = await todo.find({});
    if (todoArr.length === 0) {
        orderN = 0;
    }
    else {
        todoArr.sort((a, b) => (a.order > b.order ? 1 : -1));
        orderN = todoArr[todoArr.length - 1].order;
    }
    orderN++;
    let person = new todo({
        name: req.body.name,
        isCompleted: false,
        order: orderN,
    });
    try {
        let todo = await person.save();
        res.end(JSON.stringify(todo));
    }
    catch (error) {
        console.log(`response//on post err==>> ${error}`);
        res.write(`post error ==>${error}`);
        res.end();
    }
});
router.get("/getall", async function (req, res) {
    try {
        let todoArr = await todo.find({});
        todoArr.sort((a, b) => (a.order > b.order ? 1 : -1));
        res.end(JSON.stringify(todoArr));
    }
    catch (error) {
        res.write(`get array from db ${error}`);
        res.end();
    }
});
router.delete("/delete", async function (req, res) {
    try {
        await todo.findOneAndRemove({ _id: req.body.id });
        res.end();
    }
    catch (error) {
        res.write(`error delete ${error}`);
        res.end();
    }
});
router.patch("/patch", async function (req, res) {
    try {
        let todoObj = await todo.findOne({ _id: req.body.id });
        await todo.findOneAndUpdate({ _id: req.body.id }, { $set: { isCompleted: !todoObj.isCompleted } });
        res.end();
    }
    catch (error) {
        res.write(`error patch====>>>>${error}`);
        res.end();
    }
});
router.patch("/order_patch", async function (req, res) {
    try {
        await todo.findOneAndUpdate({ _id: req.body.id }, { $set: { order: req.body.order } });
        res.end();
    }
    catch (error) {
        res.write(`error patch====>>>>${error}`);
        res.end();
    }
});
router.put("/put", async function (req, res) {
    try {
        await todo.updateMany({}, { $set: { isCompleted: req.body.status } });
        res.end();
    }
    catch (error) {
        res.write(`all updated error ${error}`);
        res.end();
    }
});
module.exports = router;
