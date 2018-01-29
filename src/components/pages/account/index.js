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
                    <Pane label="Title 1" active>
                        <section className="filler">
                            <h2>Filler 1</h2>
                        </section>
                    </Pane>
                    <Pane label="Title 2">
                        <section className="filler">
                            <h2>Filler 2</h2>
                        </section>
                    </Pane>
                </Tabs>
            </div>
        );
    };
}

export default Account;
