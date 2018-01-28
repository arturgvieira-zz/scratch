import React, { Component } from 'react';
import './tabs.css';

class Tabs extends Component {
    render = () => {
        return (
            <div className="Tabs">
                {this.props.children}
            </div>
        );
    };
}

export default Tabs;
