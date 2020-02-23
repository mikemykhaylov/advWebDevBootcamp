import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

const AddTodo = ({ handleInput, handleSubmit, newTodoText }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => handleInput(e.target.value)} value={newTodoText} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: (e) => {
      const { newTodoText, handleInput } = ownProps;
      e.preventDefault();
      if (newTodoText.trim()) {
        dispatch(addTodo(ownProps.newTodoText));
        handleInput('');
      }
    },
  };
};

AddTodo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  newTodoText: PropTypes.string.isRequired,
};
export default connect(null, mapDispatchToProps)(AddTodo);
