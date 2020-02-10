import React from 'react';
import PropTypes from 'prop-types';

function Input({ propValue, propName, placeholder, inputHandler, label }) {
  const textField = propName === 'instructions' ? (
    <textarea
      name={propName}
      className="form__input"
      placeholder={placeholder}
      cols="30"
      rows="10"
      onChange={inputHandler}
      value={propValue}
    />
  ) : (
    <input
      type="text"
      name={propName}
      placeholder={placeholder}
      onChange={inputHandler}
      className="form__input"
      value={propValue}
    />
  )
  return (
    <div className="form__input-wrap">
      <span className="form__input-label">{label}</span>
      {textField}
    </div>
  );
}

Input.propTypes = {
  propValue: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputHandler: PropTypes.func.isRequired,
}

export default Input;