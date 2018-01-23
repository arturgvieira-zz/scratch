const Server = require('./server.js');
const Util = require('./util.js');

class Main {
    run() {
        const server = new Server();
        const util = new Util('./server/graph.ql');
        util.process();

        util.on('File Processed', data => {
            console.log('Schema Loaded');
            server.init(data);
        });
    }
}

const main = new Main();
main.run();
