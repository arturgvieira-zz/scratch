import React, { Component } from 'react';
// Components
import Splash from './components/splash';
// import Register from './components/register/register';
// import Login from './components/login/login';

class Account extends Component {
    state = {};

    componentDidCatch = (error, info) => {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        console.error(error, info);
        console.error(info.componentStack);
    };

    warningBanner = () => (
        <div className="error">Sorry, something went wrong.</div>
    );

    render = () => {
        return (
            <div className="Account">
                {this.state.hasError && this.warningBanner()}
                <Splash />
            </div>
        );
    };
}

export default Account;
