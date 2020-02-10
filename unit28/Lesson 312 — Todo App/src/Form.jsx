import React from 'react';
import Proptypes from 'prop-types';
import './Form.scss';

function Form({ newTodo, changeHandler, submitHandler }) {
  return (
    <form className="form" onSubmit={submitHandler}>
      <input
        type="text"
        name="newTodo"
        value={newTodo}
        onChange={changeHandler}
        placeholder="What needs to be done?"
      />
      <button type="submit">Add</button>
    </form>
  );
}

Form.propTypes = {
  newTodo: Proptypes.string.isRequired,
  changeHandler: Proptypes.func.isRequired,
  submitHandler: Proptypes.func.isRequired,
};

export default Form;
