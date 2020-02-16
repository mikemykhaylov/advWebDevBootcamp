import React from 'react';
import '../scss/Todo.scss';

function TodoWrap({ children }) {
  return <ul className="todo__wrap">{children}</ul>;
}

export default TodoWrap;
