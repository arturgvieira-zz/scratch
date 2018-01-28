import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from './resources/logo.svg';
import menu from './resources/menu.svg';
// Components
import Drawer from './components/drawer';

class Header extends Component {
    state = {};

    handleClick = () => {
        this.setState({ showDrawer: true });
    };

    handleClose = () => {
        this.setState({ showDrawer: false });
    };

    render = () => {
        const { showDrawer } = this.state;
        return (
            <div className="Header">
                {showDrawer ? <Drawer onClose={this.handleClose} /> : null}
                <header role="presentation" className="elevation-4dp">
                    <article className="branding">
                        <img src={logo} alt="Logo" className="logo" />
                        <Link to="/">
                            <h2>kami</h2>
                        </Link>
                    </article>
                    <nav>
                        <Link to="/about" replace>
                            About
                        </Link>
                        <Link to="/account" replace>
                            Account / Log in
                        </Link>
                    </nav>
                    <img
                        src={menu}
                        alt="Menu"
                        className="menu"
                        onClick={this.handleClick}
                        aria-haspopup="true"
                    />
                </header>
            </div>
        );
    };
}

export default Header;
