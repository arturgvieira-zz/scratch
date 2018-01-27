const query = require('./db');
const uuidv4 = require('uuid/v4');
const { PubSub } = require('graphql-subscriptions');
const Util = require('./util');

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
                //Dev only console
                console.log('[#] [QUERY]: getPersonById(): [>] : ');
                return Util.unBoxSingleResult(result);
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
                console.log('[#] [QUERY]: getPersonByName(): [>] : ');
                return Util.unBoxSingleResult(result);
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
                console.log('[#] [QUERY]: getPeople(): [>] : ');
                return Util.unBoxManyResults(results);
            } catch (err) {
                throw new Error(err);
            }
        },
        getMessage: async (obj, args, context, info) => {
            try {
                let result = await query(
                    'MATCH (message:Message) RETURN *',
                    args,
                    'message'
                );
                console.log('[#] [QUERY]: getMessage(): [>] : ');
                return Util.unBoxSingleResult(result);
            } catch (err) {
                throw new Error(err);
            }
        },
        getActorMessages: async (obj, args, context, info) => {
            try {
                let results = await query(
                    'MATCH (message:Message)<-[relationship:$relationship]-(person:Person {id: $id, name: $name}) RETURN message LIMIT 25',
                    args,
                    'message'
                );
                console.log('[#] [QUERY]: getMessage(): [>] : ');
                return Util.unBoxManyResults(results);
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
                console.log('[#] [MUTATION]: createPerson(): [>] : ');
                result = Util.unBoxSingleResult(result);
                pubSub.publish('personChannel', {
                    personChannel: result
                });
                return result;
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
                console.log('[#] [MUTATION]: removePerson(): [>] : ');
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
            subscribe: () => pubSub.asyncIterator('personChannel')
        }
    }
};
