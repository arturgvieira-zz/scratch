const query = require('./db');
const uuidv4 = require('uuid/v4');
const { PubSub } = require('graphql-subscriptions');
const pubSub = new PubSub();
// The root provides a resolver function for each API endpoint
module.exports = {
    //Query Resolvers
    Query: {
        getPersonById: async (obj, args, context, info) => {
            try {
                let result = await query(
                    'MATCH (person:Person {id: $id}) RETURN *',
                    obj,
                    'person'
                );
                //Dev only console
                console.log(
                    '[#] [QUERY]: getPersonById(): [>] : ',
                    JSON.stringify(result, null, 4)
                );
                if (result) {
                    result = result.map(result => ({
                        ...result['properties']
                    }));
                    return result[0];
                } else {
                    return null;
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        getPersonByName: async (obj, args, context, info) => {
            try {
                let result = await query(
                    'MATCH (person:Person {name: $name}) RETURN *',
                    obj,
                    'person'
                );
                //Dev only console
                console.log(
                    '[#] [QUERY]: getPersonByName(): [>] : ',
                    JSON.stringify(result, null, 4)
                );
                if (result) {
                    result = result.map(result => ({
                        ...result['properties']
                    }));
                    return result[0];
                } else {
                    return null;
                }
            } catch (err) {
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
                //Dev only console
                console.log(
                    '[#] [QUERY]: getPeople(): [>] : ',
                    JSON.stringify(results, null, 4)
                );
                if (results) {
                    return results.map(result => ({ ...result['properties'] }));
                } else {
                    return [];
                }
            } catch (err) {
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
                //Dev only console
                console.log(
                    '[#] [MUTATION]: createPerson(): [>] : ',
                    JSON.stringify(result, null, 4)
                );
                if (result) {
                    result = result.map(result => ({
                        ...result['properties']
                    }));
                    pubSub.publish('personChannel', {
                        personChannel: result[0]
                    });
                    return result[0];
                } else {
                    return null;
                }
            } catch (err) {
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
                //Dev only console
                console.log(
                    '[#] [MUTATION]: removePerson(): [>] : ',
                    JSON.stringify(result, null, 4)
                );
                pubSub.publish('personChannel', { personChannel: args });
                return args;
            } catch (err) {
                throw new Error(error);
            }
        }
    },
    Subscription: {
        //Subscription Resolvers
        personChannel: {
            subscribe: () => {
                console.log(
                    '[#] [SUBSCRIPTION]: personChannel(): [>] : Connected'
                );
                pubSub.asyncIterator('personChannel');
            }
        }
    }
};
