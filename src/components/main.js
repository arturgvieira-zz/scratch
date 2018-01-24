import React, { Component } from 'react';
import './main.css';

// Components
//import Account from './account/account';
import Splash from './splash/splash';

class Main extends Component {
    render() {
        return (
            <div className="Main">
                <Splash />
                {/*<Account />*/}
            </div>
        );
    }
}

export default Main;
