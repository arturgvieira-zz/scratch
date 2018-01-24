import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './App.css';

// Components
import Main from './components/main';

const httpLink = new HttpLink({ uri: 'http://localhost:8080/graphql' });
const wsLink = new WebSocketLink({
    uri: `ws://localhost:8080/graphql/subscriptions`,
    options: {
        reconnect: true
    }
});

const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div className="App">
                    <Main />
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
