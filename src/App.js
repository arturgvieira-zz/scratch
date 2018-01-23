import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './App.css';

// Components
import Main from './components/main';

const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:8080/graphql' }),
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
