import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ active, children, onClick }) => {
  let className = 'filter__button';
  if (active) {
    className += ' filter__button_active';
  }
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
};
Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default Link;
