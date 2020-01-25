import React from 'react';
import PropTypes from 'prop-types';
import './Box.css';

function Box({ color }) {
  return <div className="box" style={{ backgroundColor: color }} />;
}

Box.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Box;
