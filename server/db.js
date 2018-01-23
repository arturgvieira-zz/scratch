// npm install --save neo4j
var neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://localhost:7687');
const session = driver.session();

module.exports = (query, params, column) =>
    session
        .run(query, params)
        .then(result => {
            session.close();
            return result.records.map(record => record.get(column));
        })
        .catch(error => {
            session.close();
            console.log(error);
        });
