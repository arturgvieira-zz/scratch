const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
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
        app.use(
            '/graphql',
            graphqlHTTP({
                schema: schema,
                rootValue: resolvers,
                graphiql: true
            })
        );
        app.listen(8080);
        console.log('Running a GraphQL API server at localhost/graphql');
    }
};
