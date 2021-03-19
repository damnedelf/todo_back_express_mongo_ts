"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TodoSchema = new Schema({
    name: String,
    isCompleted: Boolean,
    order: Number
}, { typeKey: "$type" });
var todo = mongoose.model("todos", TodoSchema);
module.exports = todo;
