const query = require('./db');
const uuidv4 = require('uuid/v4');
const { PubSub } = require('graphql-subscriptions');
const pubSub = new PubSub();
// The root provides a resolver function for each API endpoint
module.exports = {
    //Query Resolvers
    Query: {
        getPerson: async (obj, args, context, info) => {
            try {
                let result = await query(
                    'MATCH (person:Person {id: $id}) RETURN *',
                    obj,
                    'person'
                );
                console.log('QUERY: getPerson()');
                if (result) {
                    result = result.map(result => ({
                        ...result['properties']
                    }));
                    return result[0];
                } else {
                    return null;
                }
            } catch (err) {
                console.log('ERROR: server/resolver.js, function: getPerson');
                throw new Error(err);
            }
        },
        getPeople: async (obj, args, context, info) => {
            try {
                let results = await query(
                    'MATCH (person:Person) RETURN * LIMIT 25',
                    obj,
                    'person'
                );
                console.log('QUERY: getPeople()');
                if (results) {
                    return results.map(result => ({ ...result['properties'] }));
                } else {
                    return [];
                }
            } catch (err) {
                console.log('ERROR: server/resolver.js, function: getPeople');
                throw new Error(err);
            }
        }
    },
    Mutation: {
        //Mutation Resolvers
        createPerson: async (obj, args, context, info) => {
            try {
                args = { ...args, id: uuidv4() };
                let result = await query(
                    'CREATE (person:Person {id: $id, name : $name}) RETURN *',
                    args,
                    'person'
                );
                result = result.map(result => ({ ...result['properties'] }));
                console.log(result[0]);
                pubSub.publish('personChannel', { personChannel: result[0] });
                return result[0];
            } catch (err) {
                console.log(
                    'ERROR: server/resolver.js, function: createPerson'
                );
                throw new Error(err);
            }
        },
        removePerson: async (obj, args, context, info) => {
            try {
                let result = await query(
                    'MATCH (person:Person) DELETE person',
                    args,
                    null
                );
                pubSub.publish('personChannel', { personChannel: args });
                return args;
            } catch (err) {
                console.log(
                    'ERROR: server/resolver.js, function: removePerson'
                );
                throw new Error(error);
            }
        }
    },
    Subscription: {
        //Subscription Resolvers
        personChannel: {
            subscribe: () => pubSub.asyncIterator('personChannel')
        }
    }
};
