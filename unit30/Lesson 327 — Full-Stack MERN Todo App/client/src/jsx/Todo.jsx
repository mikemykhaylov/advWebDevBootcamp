/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from './icons/CloseIcon';

function Todo({ name, status, id, toggleCompletion, deleteTodo }) {
  let classString = 'todo__text';
  if (status) {
    classString += ' todo__text_done';
  }
  return (
    <li className="todo">
      <button type="button" className={classString} onClick={() => toggleCompletion(id)}>
        {name}
      </button>
      <CloseIcon size={45} deleteTodo={deleteTodo} id={id} />
    </li>
  );
}

Todo.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  toggleCompletion: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default Todo;
