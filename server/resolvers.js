const { PubSub } = require('graphql-subscriptions');
const query = require('./db');
const uuidv4 = require('uuid/v4');

const pubsub = new PubSub();
// The root provides a resolver function for each API endpoint
module.exports = {
    // Query Resolvers
    getPerson: async (obj, args, context, info) => {
        let result = await query(
            'MATCH (person:Person {id: $id}) RETURN *',
            obj,
            'person'
        );
        result = result.map(result => ({ ...result['properties'] }));
        return result[0];
    },
    getPeople: async (obj, args, context, info) => {
        const results = await query(
            'MATCH (person:Person) RETURN * LIMIT 25',
            obj,
            'person'
        );
        return results.map(result => ({ ...result['properties'] }));
    },
    // Mutation Resolvers
    createPerson: async (obj, args, context, info) => {
        try {
            obj = { ...obj, id: uuidv4() };
            const result = await query(
                'CREATE (person:Person {id: $id, name : $name}) RETURN person.name as result',
                obj,
                'result'
            );
            pubsub.publish('subscription:personCreated', { name: result[0] });
            return { id: params.id, name: result[0] };
        } catch (err) {
            console.log('server/resolver.js, function: createPerson');
            throw new Error(error);
        }
    },
    removePerson: async (obj, args, context, info) => {
        try {
            const result = await query(
                'MATCH (person:Person) DELETE person',
                obj,
                null
            );
            pubsub.publish('subscription:personRemoved', obj);
            return obj;
        } catch (err) {
            console.log('server/resolver.js, function: removePerson');
            throw new Error(error);
        }
    },
    // Subscription Resolvers
    personCreated: () => {
        return () => pubsub.asyncIterator('subscription:personCreated');
    },
    personRemoved: () => {
        return () => pubsub.asyncIterator('subscription:personRemoved');
    }
};
