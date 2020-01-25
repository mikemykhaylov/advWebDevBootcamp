import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Recipe App</h1>
      <nav className="header__nav">
        <li className="header__menu">
          <b>New Recipe</b>
        </li>
        <li className="header__menu">Home</li>
        <li className="header__menu">About Us</li>
        <li className="header__menu">Contact</li>
      </nav>
    </header>
  );
}

export default Header;
