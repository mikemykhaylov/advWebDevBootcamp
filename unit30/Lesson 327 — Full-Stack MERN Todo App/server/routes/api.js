const express = require('express');
const logic = require('../helpers/api');

const router = express.Router();

router
  .route('/api/todos')
  .get(logic.getTodos)
  .post(logic.addTodo);

router
  .route('/api/todos/:todoid')
  .get(logic.getTodo)
  .put(logic.updateTodo)
  .delete(logic.deleteTodo);

router.get('*', logic.notFound);

module.exports = router;
