import React, { Component } from 'react';
import './account.css';
// Components
import Tabs from './components/tabs';
import Pane from './components/pane';
class Account extends Component {
    render = () => {
        return (
            <div className="Account page">
                <Tabs>
                    <Pane label="Register">
                        <section className="filler">
                            <h2>Register</h2>
                        </section>
                    </Pane>
                    <Pane label="Sign in" active>
                        <section className="filler">
                            <h2>Sign in</h2>
                        </section>
                    </Pane>
                </Tabs>
            </div>
        );
    };
}

export default Account;
