import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

function Header({ toggleForm }) {
  return (
    <header className="header">
      <div className="container header__container">
        <h1 className="header__title">Recipe App</h1>
        <nav className="header__nav">
          <button
            className="header__menu header__menu_button"
            type="button"
            onClick={() => toggleForm(true)}
          >
            New Recipe
          </button>
          <li className="header__menu">Home</li>
          <li className="header__menu">About Us</li>
          <li className="header__menu">Contact</li>
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default Header;
