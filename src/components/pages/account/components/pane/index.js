import React, { Component } from 'react';
import './pane.css';

class Pane extends Component {
    render = () => {
        return <div className="Pane">{this.props.children}</div>;
    };
}

export default Pane;
