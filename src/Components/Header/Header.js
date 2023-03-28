import React from 'react';
import './Header.css';

function Header({ signOut }) {
  return (
    <div className="header">
      <h1 className="app-name">tracKemist</h1>
      <button type="button" className="sign-out-button" onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default Header;
