import React, { Component } from 'react';
import './main.css';

// Components
import HelloWorld from './hello/hello';

class Main extends Component {
    render() {
        return (
            <div className="Main">
                <HelloWorld />
            </div>
        );
    }
}

export default Main;
