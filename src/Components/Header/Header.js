import './Header.css';
import React from "react";

const Header = (props) => {
    const signOut = () => {
        props.signOut();
    }
    return (
        <nav className="Header">
            <h1>trac<span className="highlight">K</span>emist</h1>
            <button id="sign-out" onClick={signOut} >Sign out</button>
        </nav>
    );
}

export default Header;