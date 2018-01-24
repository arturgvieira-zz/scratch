const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
type Query {
    getPerson(id: String, name: String): Person
    getPeople: [Person]
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

schema {
    subscription: Subscription
    query: Query
    mutation: Mutation
}
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
