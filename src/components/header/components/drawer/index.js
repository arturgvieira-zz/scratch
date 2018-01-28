import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './drawer.css';

class Drawer extends Component {
    setListener() {
        document.addEventListener('keyup', e => {
            if (e.keyCode === 27) this.handleClose();
        });
    }

    componentDidMount() {
        this.setListener();
    }

    handleClose = () => {
        this.props.onClose();
    };

    render = () => {
        return (
            <div className="Drawer" onClick={this.handleClose}>
                <nav className="elevation-16dp">
                    <Link to="/" aria-haspopup="true">
                        <h4>kami</h4>
                    </Link>
                    <Link to="/account" aria-haspopup="true">
                        <p>Account / Log in</p>
                    </Link>
                    <Link to="/about" aria-haspopup="true">
                        <p>About</p>
                    </Link>
                </nav>
            </div>
        );
    };
}

export default Drawer;
