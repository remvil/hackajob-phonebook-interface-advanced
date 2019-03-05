const winston = require('winston')
const config = require('config')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Setup the template engine
app.set('view engine', 'ejs');

// Prevent uncaughtExceptio during fetching JSON: - reason: unable to verify the first certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// Setup the Logging
require('./startup/logging')();

// Setup API endpoint 
require('./startup/routes')(app);

// Setup Error handler
app.use(require('./startup/errors'));

// Start the server
app.listen(config.ListeningPort, () => {
    winston.info(`Phonebook Interface run and listening on port ${config.ListeningPort} ...`);
});