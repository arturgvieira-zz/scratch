import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// Components

class Login extends Component {
    state = {
        api: null
    };

    componentWillMount = () => {
        this.update(this.props);
    };

    update = ({ query }) => {
        this.setState({ api: query });
    };

    warningBanner = props => <div className="error">Error!</div>;

    render = () => {
        const { api } = this.state;

        return <div className="Login" />;
    };
}

const query = gql`
    {
        hello
    }
`;

export default graphql(query, { name: 'query' })(Login);
