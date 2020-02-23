import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function TodoList({ children, getTodos }) {
  useEffect(() => {
    getTodos();
  }, []);
  return <div className="todo__list">{children}</div>;
}

TodoList.propTypes = {
  getTodos: PropTypes.func.isRequired,
};

export default TodoList;
