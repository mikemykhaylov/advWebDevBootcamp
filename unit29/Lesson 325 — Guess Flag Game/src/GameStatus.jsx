import React from 'react';
import PropTypes from 'prop-types';

function GameStatus({ status, currentCountry, selectCountries }) {
  let statusText;
  if (status === 1) {
    statusText = 'You guessed it!';
  } else {
    statusText = `Wrong! Correct country was ${currentCountry}`;
  }
  return (
    <div className="controlls__status">
      <p>{statusText}</p>
      <button type="button" onClick={selectCountries}>
        Next flag
      </button>
    </div>
  );
}

GameStatus.propTypes = {
  status: PropTypes.number.isRequired,
  currentCountry: PropTypes.string.isRequired,
  selectCountries: PropTypes.func.isRequired,
};

export default GameStatus;
