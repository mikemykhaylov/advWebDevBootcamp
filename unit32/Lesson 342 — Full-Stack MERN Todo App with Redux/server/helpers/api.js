const Todo = require('../models/ToDo');

module.exports = {
  getTodos: (req, res) => {
    Todo.find({})
      .then((todos) => res.json(todos))
      .catch((err) => res.send('Failed to show todos'));
  },
  getTodo: (req, res) => {
    Todo.findById(req.params.todoid)
      .then((todo) => res.json(todo))
      .catch((err) => res.send('Failed to show todo'));
  },
  addTodo: (req, res) => {
    Todo.create({ name: req.body.name })
      .then((todo) => res.json(todo))
      .catch((err) => res.send('Failed to create todo'));
  },
  updateTodo: (req, res) => {
    if (!req.body.todo) {
      res.send('No data was provided for update');
    } else {
      Todo.findByIdAndUpdate(req.params.todoid, req.body.todo, { runValidators: true })
        .then((todo) => res.json(todo))
        .catch((err) => res.send('Failed to update todo'));
    }
  },
  deleteTodo: (req, res) => {
    Todo.findByIdAndDelete(req.params.todoid)
      .then((todo) => res.json(todo))
      .catch((err) => res.send('Failed to delete todo'));
  },
  notFound: (req, res) => {
    res.status(404).send('Not found');
  },
};
