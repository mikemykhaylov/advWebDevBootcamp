import React from 'react';
import PropTypes from 'prop-types';
import './GameControlls.scss';

function GameControlls({ countries, handleChoice, acceptChoice }) {
  return (
    <form className="controlls__form" onSubmit={acceptChoice}>
      {countries.map((val, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <label htmlFor={i} className="controlls__input" key={i}>
            <input
              className="controlls__radio"
              type="radio"
              name="guess"
              id={i}
              value={val.name}
              onChange={handleChoice}
            />
            {val.name}
          </label>
        );
      })}
      <button type="submit" className="controlls__submit">
        Guess
      </button>
    </form>
  );
}

GameControlls.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object),
  handleChoice: PropTypes.func.isRequired,
  acceptChoice: PropTypes.func.isRequired,
};

GameControlls.defaultProps = {
  countries: [
    {
      name: 'Country 1',
    },
    {
      name: 'Country 2',
    },
    {
      name: 'Country 3',
    },
    {
      name: 'Country 4',
    },
  ],
};

export default GameControlls;
