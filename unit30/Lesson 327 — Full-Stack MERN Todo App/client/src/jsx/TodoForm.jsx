import React from 'react';
import PropTypes from 'prop-types';
import '../scss/Form.scss';

function TodoForm({ newTodoText, todoTextInput, addTodo }) {
  return (
    <form className="form" onSubmit={addTodo}>
      <input
        className="form__input"
        name="newTodoText"
        value={newTodoText}
        placeholder="Please insert your task here..."
        onChange={todoTextInput}
      />
    </form>
  );
}

TodoForm.propTypes = {
  newTodoText: PropTypes.string.isRequired,
  todoTextInput: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default TodoForm;
