import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import '../scss/Todo.scss';

const TodoWrap = ({ todos, toggleTodo, deleteTodo }) => {
  return (
    <ul className="todo__wrap">
      {todos.map((todo) => (
        <Todo
          className="todo"
          key={todo._id}
          name={todo.name}
          completed={todo.completed}
          toggleTodo={() => toggleTodo(todo._id, todo.completed)}
          deleteTodo={() => deleteTodo(todo._id)}
        />
      ))}
    </ul>
  );
};

TodoWrap.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
export default TodoWrap;
