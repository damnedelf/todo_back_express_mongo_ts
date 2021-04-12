//todo schema for mongo


const mongoose = require('mongoose');


const TodoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
  order: { type: Number, required: true },
});
const todo = mongoose.model('todos', TodoSchema);
module.exports = todo;
