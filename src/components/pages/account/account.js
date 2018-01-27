import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// Components
import Login from './components/login/login';

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
                <p>Account</p>
                <Route
                    exact
                    path="/account/login"
                    component={() => <Login />}
                />
            </div>
        );
    };
}

export default Account;
