import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './main.css';

// Components
import Header from './presentation/header/header';
import Splash from './pages/splash/splash';
import Account from './pages/account/account';

class Main extends Component {
    render() {
        return (
            <Router>
                <div className="Main page">
                    <Header />
                    <Route exact path="/" component={() => <Splash />} />
                    <Route path="/account" component={() => <Account />} />                    
                </div>
            </Router>
        );
    }
}

export default Main;
