type Query {
    hello: String!
    getPerson(id: ID, name: String): String!
    getPeople: [String!]!
}

type Mutation {
  createPerson(name: String!): Person!
}

type Subscription {
  personCreated(name: String!): Person!
}

type Person {
    id: ID!
    name: String!
}
