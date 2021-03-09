"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TodoSchema = new Schema({
    name: String,
    id: String,
    isCompleted: Boolean,
}, { typeKey: "$type" });
const todo = mongoose.model("todos", TodoSchema);
module.exports = todo;
//# sourceMappingURL=todo_model.js.map