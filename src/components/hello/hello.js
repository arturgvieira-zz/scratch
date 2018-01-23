import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// Components

class Account extends Component {
    state = {
        text: null
    };

    componentWillMount() {
        this.update(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps);
    }

    update({ query }) {
        this.setState({ text: query });
    }

    render() {
        const { text } = this.state;
        
        return (
            <div className="Account">
                
            </div>
        );
    }
}

const query = gql`
    {
        fullName
        hello
    }
`;

export default graphql(query, { name: 'query' })(Account);
