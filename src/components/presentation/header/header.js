import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from './resources/logo.svg';
class Header extends Component {
    render() {
        return (
            <header role="presentation" className="elevation-4dp">
                <article className="branding">
                    <img src={logo} alt="Logo" className="logo" />
                    <Link to="/">
                        <h2>kami</h2>
                    </Link>
                </article>
                <nav>
                    <ul>
                        <li>About</li>
                        <li>
                            <Link to="/account">Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/account/login">Login</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;