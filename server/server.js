const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema, execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const cors = require('cors');
const morgan = require('morgan');
const resolvers = require('./resolvers');
module.exports = class Server {
    init(init) {
        const app = express();
        // cors
        app.use(cors());
        // logging
        app.use(morgan('dev'));
        // prod config
        // app.use('/', express.static('build'));
        // Construct a schema, using GraphQL schema language
        const schema = buildSchema(init);

        app.listen(8080);

        app.use(
            '/graphql',
            graphqlHTTP({
                schema: schema,
                rootValue: resolvers,
                graphiql: true
            })
        );

        const subscriptionServer = SubscriptionServer.create(
            {
                schema,
                execute,
                subscribe
            },
            {
                server: app,
                path: '/socket'
            }
        );

        console.log('Running a GraphQL API server at localhost/graphql');
    }
};
