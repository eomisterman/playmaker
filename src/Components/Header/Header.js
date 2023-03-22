import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ signOut }) => {
  return (
    <div className="header">
      <h1 className="app-name">tracKemist</h1>
      <button className="sign-out-button" onClick={signOut}>Sign Out</button>
    </div>
  );
};

Header.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Header;