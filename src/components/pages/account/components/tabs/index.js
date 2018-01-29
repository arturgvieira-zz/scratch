import React, { Component } from 'react';
import './tabs.css';

class Tabs extends Component {
    state = {};

    componentWillMount() {
        this.setTabs();
    }

    setTabs() {
        const titles = this.props.children
            .map(node => node.props.label)
            .map((title, index) => (
                <h3 key={index} onClick={() => this.handleClick(index)}>
                    {title}
                </h3>
            ));

        const body = this.props.children.filter(node => node.props.active);
        this.setState({ titles: titles, body: body });
    }

    handleClick = index => {
        console.log(index);
        const body = this.props.children[index];
        this.setState({ body: body });
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
