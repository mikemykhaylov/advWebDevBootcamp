/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({ todos, onTodoClick, onButtonClick }) => (
  <ul>
    {todos.map((todo) => (
      <Todo
        key={todo.id}
        text={todo.text}
        done={todo.done}
        onClick={() => onTodoClick(todo.id)}
        onButtonClick={() => onButtonClick(todo.id)}
      />
    ))}
  </ul>
);
TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      done: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
export default TodoList;
