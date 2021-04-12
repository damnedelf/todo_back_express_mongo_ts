//todo schema for mongo

var mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
    order: { type: Number, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
TodoSchema.virtual('id').get(function (this: any) {
  return this._id;
});

const todo = mongoose.model('todos', TodoSchema);
module.exports = todo;
