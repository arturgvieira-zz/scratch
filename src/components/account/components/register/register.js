import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// Components

class Register extends Component {
    state = {
        api: null
    };

    componentWillMount = () => {
        this.update(this.props);
    };

    update = ({ query }) => {
        this.setState({ api: query });
    };

    render = () => {
        const { api } = this.state;

        return <div className="Register" />;
    };
}

const query = gql`
    {
        fullName
        hello
    }
`;

export default graphql(query, { name: 'query' })(Register);
