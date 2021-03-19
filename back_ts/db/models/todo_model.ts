//todo schema for mongo
export {};
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TodoSchema = new Schema(
  {
    name: String,
    isCompleted: Boolean,
    order: Number,
  },
  { typeKey: "$type" }
);
const todo = mongoose.model("todos", TodoSchema);
module.exports = todo;
