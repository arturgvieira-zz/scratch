import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// Components

class Splash extends Component {
    state = {
        api: null
    };

    update = ({ query }) => {
        this.setState({ api: query });
    };

    componentWillMount = () => {
        this.update(this.props);
    };

    subscribe = () => {
        this.props.query.subscribeToMore({
            document: subscription,
            updateQuery: (previous, { subscriptionData }) => {
                const updates = [
                    subscriptionData.data.name,
                    ...previous.api.data
                ];
                const result = {
                    ...previous,
                    api: {
                        data: updates
                    }
                };
                return result;
            }
        });
    };

    componentDidMount() {
        this.subscribe;
    }

    render = () => {
        const { api } = this.state;

        return <div className="Splash">{api && JSON.stringify(api)}</div>;
    };
}

const query = gql`
    {
        hello
    }
`;

const subscription = gql`
    subscription {
        personCreated {
            name
        }
    }
`;

export default graphql(query, { name: 'query' })(Splash);
