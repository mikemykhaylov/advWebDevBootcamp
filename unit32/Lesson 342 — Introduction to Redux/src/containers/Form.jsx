import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo } from '../actions';
import '../scss/Form.scss';

const Form = ({ handleInput, handleSubmit, newTodoText }) => {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="form__input"
        onChange={(e) => handleInput(e.target.value)}
        value={newTodoText}
        placeholder="What are you going to do next?"
      />
      <button className="form__add-button" type="submit">
        Add Todo
      </button>
    </form>
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

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  newTodoText: PropTypes.string.isRequired,
};
export default connect(null, mapDispatchToProps)(Form);
