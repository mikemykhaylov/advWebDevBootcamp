const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: "Name can't be blank",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const TodoModel = mongoose.model('todo', toDoSchema);

module.exports = TodoModel;
