/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ onClick, onButtonClick, done, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: done ? 'line-through' : 'none',
    }}
  >
    {text}
    <button type="button" onClick={onButtonClick}>Delete</button>
  </li>
);
Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};
export default Todo;
