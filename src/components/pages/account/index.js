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
                    <Pane>
                        <h3>Title 1</h3>
                        <p className="filler">Filler 1</p>
                    </Pane>
                    <Pane>
                        <h3>Title 2</h3>
                        <p className="filler">Filler 2</p>
                    </Pane>
                </Tabs>
            </div>
        );
    };
}

export default Account;
