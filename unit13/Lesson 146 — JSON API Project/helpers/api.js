const Todo = require('../models/ToDo');

module.exports = {
  getTodos: (req, res) => {
    Todo.find({}, (todoFindErr, foundTodos) => {
      if (todoFindErr) {
        res.send('Failed to show todos');
      } else {
        res.send(JSON.stringify(foundTodos));
      }
    });
  },
  getTodo: (req, res) => {
    Todo.findById(req.params.todoid, (todoFindErr, foundTodo) => {
      if (todoFindErr) {
        res.send('Failed to show todo');
      } else {
        res.send(JSON.stringify(foundTodo));
      }
    });
  },
  addTodo: (req, res) => {
    Todo.create({ name: req.body.name }, (todoCreateErr, createdTodo) => {
      if (todoCreateErr) {
        res.send('Failed to create todo');
      } else {
        res.send('Successfully added todo!');
      }
    });
  },
  updateTodo: (req, res) => {
    Todo.findByIdAndUpdate(req.params.todoid, req.body.todo, (todoUpdateErr, updatedTodo) => {
      if (todoUpdateErr) {
        res.send('Failed to update todo');
      } else {
        res.send('Successfully updated todo!');
      }
    });
  },
  deleteTodo: (req, res) => {
    Todo.findByIdAndDelete(req.params.todoid, (todoDeleteErr, deletedTodo) => {
      if (todoDeleteErr) {
        res.send('Failed to delete todo');
      } else {
        res.send('Successfully deleted todo!');
      }
    });
  },
  notFound: (req, res) => {
    res.send('Not found');
  },
};
