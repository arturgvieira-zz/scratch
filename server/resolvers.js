const { PubSub } = require('graphql-subscriptions');
const query = require('./db');

const pubsub = new PubSub();
// The root provides a resolver function for each API endpoint
module.exports = {
    // Query Resolvers
    hello: (obj, args, context, info) => {
        return query(
            'MATCH (person:Person)-[:SAYS]->(message:Message) RETURN message.name as result',
            { name: 'Artur Vieira' },
            'result'
        );
    },
    getPerson: (obj, args, context, info) => {
        return query(
            'MATCH (person:Person) RETURN person.name as result',
            args,
            'result'
        );
    },
    getPeople: (obj, args, context, info) => {
        return query(
            'MATCH (person:Person) RETURN person.name as result LIMIT 25',
            args,
            'result'
        );
    },
    // Mutation Resolvers
    createPerson: (obj, args, context, info) => {
        const result = query(
            'CREATE (person:Person) RETURN person as result',
            args,
            'result'
        );
        pubsub.publish('subscription', { name: result.name });
    },
    // Subscription Resolvers
    personCreated: (obj, args, context, info) => {
        return () => pubsub.asyncIterator('subscription');
    }
};
