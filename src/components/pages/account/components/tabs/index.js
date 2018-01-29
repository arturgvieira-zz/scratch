import React, { Component } from 'react';
import './tabs.css';

class Tabs extends Component {
    state = {};

    componentWillMount() {
        this.setTabs();
    }

    setTabs(index) {
        let activeIndex = null;
        let body = null;
        if (!index) {
            activeIndex = this.props.children.reduce((acc, next, index) => {
                if (next.props.active) acc = index;
                return acc;
            }, 0);
            body = this.props.children.filter(node => node.props.active);
        } else {
            activeIndex = index;
            body = this.props.children[index];
        }
        const titles = this.props.children
            .map(node => node.props.label)
            .map((title, index) => (
                <h3
                    key={index}
                    className={`titles ${
                        index === activeIndex ? 'active' : ''
                    }`}
                    onClick={() => this.handleClick(index)}
                >
                    {title}
                </h3>
            ));
        this.setState({ titles: titles, body: body });
    }

    handleClick = index => {
        this.setTabs(index);
    };

    render = () => {
        const { titles, body } = this.state;
        return (
            <div className="Tabs">
                <div className="titles">{titles}</div>
                <div className="body">{body}</div>
            </div>
        );
    };
}

export default Tabs;
