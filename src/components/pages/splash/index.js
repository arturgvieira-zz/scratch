import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './splash.css';
// Components
import Hero from './components/hero';

class Splash extends Component {
    state = {
        api: null
    };

    update = ({ getPeople }) => {
        this.setState({ api: getPeople });
    };

    componentWillReceiveProps = nextProps => {
        this.update(nextProps.query);
    };

    componentWillMount = () => {
        this.update(this.props.query);
    };

    subscribe = () => {
        this.props.query.subscribeToMore({
            document: subscription,
            updateQuery: (previous, { subscriptionData }) => {
                console.log(previous, subscriptionData);
                const newListOfPeople = [
                    subscriptionData.data.personChannel,
                    ...previous.getPeople
                ];
                const result = {
                    ...previous,
                    getPeople: newListOfPeople
                };
                return result;
            }
        });
    };

    componentDidMount() {
        this.subscribe();
    }

    render = () => {
        const { api } = this.state;

        return (
            <main className="Splash">
                <Hero />
                <p>Splash</p>
            </main>
        );
    };
}

const query = gql`
    {
        getPeople {
            id
            name
        }
    }
`;

const subscription = gql`
    subscription {
        personChannel {
            id
            name
        }
    }
`;

export default graphql(query, { name: 'query' })(Splash);
