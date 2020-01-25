import React from 'react';
import PropTypes from 'prop-types';
import './Instructor.css';

function Instructor({ name, hobbies }) {
  return (
    <div className="instructor">
      <h2>{name}</h2>
      <h4>{`Hobbies: ${hobbies.join(', ')}`}</h4>
    </div>
  );
}

Instructor.propTypes = {
  name: PropTypes.string.isRequired,
  hobbies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Instructor;
