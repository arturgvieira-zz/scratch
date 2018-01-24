type Query {
    getPerson(id: String, name: String): Person
    getPeople: [Person]
}

type Mutation {
  createPerson(name: String!): Person
  removePerson(id: String!): Person
}

type Subscription {
  personCreated: Person
  personRemoved: Person
}

type Person {
    id: String
    name: String
}
