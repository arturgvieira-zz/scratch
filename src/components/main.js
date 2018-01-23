import React, { Component } from 'react';
import './main.css';

// Components
import Account from './account/account';

class Main extends Component {
    render() {
        return (
            <div className="Main">
                <Account />
            </div>
        );
    }
}

export default Main;
