import React from 'react';
import PropTypes from 'prop-types';

function Todos({ todos }) {
  return (
    <ol>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ol>
  );
}

Todos.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
};

Todos.defaultProps = {
  todos: [],
};

export default Todos;
