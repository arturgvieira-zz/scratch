const { createServer } = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { execute, subscribe } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const cors = require('cors');
const morgan = require('morgan');
const graphqlSchema = require('./schema');

const PORT = 8080;
const app = express();
// cors
app.use(cors());
// logging
app.use(morgan('dev'));
// prod config
// app.use('/', express.static('build'));

app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({
        schema: graphqlSchema
    })
);
app.use(
    '/graphiql',
    graphiqlExpress({
        endpointURL: '/graphql',
        subscriptionsEndpoint: `ws://localhost:${PORT}/graphql/subscriptions`
    })
);

const ws = createServer(app);
ws.listen(PORT, () => {
    console.log('Listening on ' + PORT);

    // Setup WebSocket for handling GraphQL subscriptions
    const subServer = new SubscriptionServer(
        {
            execute,
            schema: graphqlSchema,
            subscribe
        },
        {
            path: '/graphql/subscriptions',
            server: ws
        }
    );
});
console.log('Running a GraphQL API server at localhost/graphql');
