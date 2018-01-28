import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './drawer.css';

class Drawer extends Component {
    componentDidMount() {
        document.addEventListener('keyup', e => {
            if (e.keyCode === 27) this.handleClose();
        });
        document.addEventListener('mouseup', e => {
            e.preventDefault();
            this.handleClose();
        });
    }

    componentDidUpdate() {
        document.addEventListener('mouseup', e => {
            e.preventDefault();
            this.handleClose();
        });
    }

    handleClose = () => {
        this.props.onClose();
    };

    render = () => {
        return (
            <div id="drawer" className="Drawer elevation-16dp">
                <Link to="/">
                    <h4>kami</h4>
                </Link>
                <Link to="/account">
                    <p>Account / Log in</p>
                </Link>
                <Link to="/about">
                    <p>About</p>
                </Link>
            </div>
        );
    };
}

export default Drawer;
