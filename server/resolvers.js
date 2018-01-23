const query = require('../model/db');

// The root provides a resolver function for each API endpoint
module.exports = {
    fullName: () => {
        return query(
            'MATCH (person:Person)-[:SAYS]->(message:Message) RETURN person.name as name',
            { message: 'Hello World!' },
            'name'
        );
    },
    hello: () => {
        return query(
            'MATCH (message:Message)<-[:SAYS]-(person:Person) RETURN message.name as result',
            { name: 'Artur Vieira' },
            'result'
        );
    }
};
