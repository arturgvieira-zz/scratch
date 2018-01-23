const { PubSub } = require('graphql-subscriptions');
const query = require('./db');

const pubsub = new PubSub();
// The root provides a resolver function for each API endpoint
module.exports = {
    // Query Resolvers
    getPerson: async (obj, args, context, info) => {
        const result = await query(
            'MATCH (person:Person) RETURN person.name as result',
            obj,
            'result'
        );
        return result;
    },
    getPeople: async (obj, args, context, info) => {
        const result = await query(
            'MATCH (person:Person) RETURN person.name as result LIMIT 25',
            obj,
            'result'
        );
        return result;
    },
    // Mutation Resolvers
    createPerson: async (obj, args, context, info) => {
        const result = await query(
            'CREATE (person:Person {name : $name}) RETURN person.name as result',
            obj,
            'result'
        );
        console.log(obj, result);
        //pubsub.publish('subscription', { name: result[0] });
        return result;
    },
    // Subscription Resolvers
    personCreated: (obj, args, context, info) => {
        return () => pubsub.asyncIterator('subscription');
    }
};
