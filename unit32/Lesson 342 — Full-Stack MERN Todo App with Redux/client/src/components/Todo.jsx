/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ toggleTodo, deleteTodo, completed, name }) => {
  let className = 'todo';
  if (completed) {
    className += ' todo_done';
  }
  return (
    <li className={className} onClick={toggleTodo}>
      <span>{name}</span>
      <button className="todo__delete-button" type="button" onClick={deleteTodo}>
        Delete
      </button>
    </li>
  );
};
Todo.propTypes = {
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};
export default Todo;
