const winston = require('winston')
const config = require('config')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
var request = require('request');
const methodOverride = require('method-override');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

// app.use(methodOverride('_method'));


// Setup the template engine
app.set('view engine', 'ejs');

// Prevent uncaughtExceptio during fetching JSON: - reason: unable to verify the first certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// Setup the Logging
require('./startup/logging')();

// Setup Error handler
app.use(require('./startup/errors'));

// Setup the contacts
var contacts;
request(config.contacts_url, function(error, response, body) {
    if (error) { winston.error(error); } else { winston.info(`Retrieve contacts from ${config.contacts_url}; statusCode: ${response && response.statusCode}`) }
    if (response && response.statusCode == 200) { contacts = JSON.parse(body).contacts; }
});

// Setup API endpoint 

// Render the ejs and display all contacts
app.get('/', function(req, res) {
    res.render('index', { contacts: contacts });
});

// GET
app.get('/api/contact/:param', (req, res) => {
    // console.log(req.params.name)
})

// POST route for adding new contact
app.post('/api/contact', function(req, res) {
    contacts.push({ name: req.body.name, phone_number: req.body.phone_number, address: req.body.address }); //after adding to the array go back to the root route
    res.redirect("/");
});

// DELETE route for removing a contact
app.delete('/api/contact/:id', async(req, res) => {
    console.log(req.params);

    // var index = res.id
    // contacts.splice(index, 1)
    res.redirect("/");
})

// Start the server
app.listen(config.ListeningPort, () => {
    winston.info(`Phonebook Interface run and listening on port ${config.ListeningPort} ...`);
});