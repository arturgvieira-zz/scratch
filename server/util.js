const fs = require('fs');
const EventEmitter = require('events').EventEmitter;

module.exports = class Util extends EventEmitter {
    constructor(file) {
        super();
        this.file = file;
        this.input;
        this.output;
    }

    testFile() {
        fs.stat(this.file, (error, stat) => {
            if (error) {
                if (error.code == 'ENOENT') {
                    console.log('The file does not exist.');
                }

                throw error;
            }
        });
    }

    process() {
        try {
            this.testFile();

            const rr = fs.createReadStream(this.file);
            rr.read();
            console.log('Processing File.');
            rr.on('data', json => {
                if (json != null) {
                    this.read(json);
                }
            });

            rr.on('end', () => {
                console.log('File Processed.');
                this.emit('File Processed', this.input);
            });
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    read(data) {
        const string = data.toString('utf-8');
        this.input = string;
    }
};
