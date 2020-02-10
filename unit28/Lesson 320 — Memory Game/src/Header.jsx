import React from "react";
import PropTypes from "prop-types";
import "./Header.scss";

function Header({ newGame }) {
  return (
    <header className="header">
      <div className="container header__container">
        <h1 className="header__title">Memory Game</h1>
        <nav className="header__nav">
          <button
            className="header__menu header__menu_button"
            type="button"
            onClick={newGame}
          >
            Start new game
          </button>
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {
  newGame: PropTypes.func
};

export default Header;
