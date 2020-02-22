import React from 'react';
import { BrowserRouter as Router, NavLink, Link } from 'react-router-dom';
import Switch from './Switch';
import '../scss/App.scss';

function App() {
  return (
    <Router>
      <div className="container link__container" style={{ textAlign: 'center' }}>
        <Link className="link link_active" to="/">
          Homepage
        </Link>
        <NavLink
          className="link"
          activeClassName="link_active"
          to="/mike"
          isActive={(match) => {
            if (match) {
              return false;
            }
            return true;
          }}
        >
          Hello Mike
        </NavLink>
        <NavLink
          className="link"
          activeClassName="link_active"
          to="/hugo"
          isActive={(match) => {
            if (match) {
              return false;
            }
            return true;
          }}
        >
          Hello Hugo
        </NavLink>
        <NavLink
          className="link"
          activeClassName="link_active"
          to="/about"
          isActive={(match) => {
            if (match) {
              return false;
            }
            return true;
          }}
        >
          About
        </NavLink>
        <Link className="link link_active" to="/somewhere">
          Redirect to Homepage
        </Link>
        <div style={{ fontSize: '3em', marginTop: '25px' }}>
          <Switch />
        </div>
      </div>
    </Router>
  );
}

export default App;
