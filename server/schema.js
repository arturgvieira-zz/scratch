const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
type Query {
    getPersonByName(name: String): Person
    getPerson(id: ID): Person
    getPeople: [Person]
    getMessage(id: ID): Message
    getActorMessages(id: ID): [Message]
}

type Mutation {
    createPerson(name: String!): Person
    removePerson(id: ID!): Person
}

type Subscription {
    personChannel: Person
}

type Person {
    id: ID
    name: String
}

type Message {
    id: ID
    name: String
}

schema {
    subscription: Subscription
    query: Query
    mutation: Mutation
}
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
