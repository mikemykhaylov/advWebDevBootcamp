import React from 'react';
import PropTypes from 'prop-types';

function Flag({ flagURL }) {
  let FlagElem;
  if (flagURL === null) {
    FlagElem = <div className="game__placeholder" />;
  } else {
    FlagElem = <img src={flagURL} className="game__flag" alt="Country Flag" />;
  }
  return FlagElem;
}

Flag.propTypes = {
  flagURL: PropTypes.string,
};

export default Flag;
