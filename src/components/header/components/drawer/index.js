import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './drawer.css';

class Drawer extends Component {
    setListener() {
        document.addEventListener('mouseup', e => {
            e.preventDefault();
            this.handleClose();
        });
    }

    componentDidMount() {
        document.addEventListener('keyup', e => {
            if (e.keyCode === 27) this.handleClose();
        });
        this.setListener();
    }

    componentDidUpdate() {
        this.setListener();
    }

    handleClose = () => {
        this.props.onClose();
    };

    render = () => {
        return (
            <div id="drawer" className="Drawer elevation-16dp">
                <Link to="/" aria-haspopup="true">
                    <h4>kami</h4>
                </Link>
                <Link to="/account" aria-haspopup="true">
                    <p>Account / Log in</p>
                </Link>
                <Link to="/about" aria-haspopup="true">
                    <p>About</p>
                </Link>
            </div>
        );
    };
}

export default Drawer;
