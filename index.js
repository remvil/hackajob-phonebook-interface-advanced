const winston = require('winston')
const config = require('config')
const methodOverride = require('method-override');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var request = require('request');

// override with the X-HTTP-Method-Override header in the request
// app.use(methodOverride('X-HTTP-Method-Override'))
app.use(bodyParser.urlencoded())
app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) { // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

// app.use(bodyParser.json());
app.use(express.static("public"));


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

// Render the index page and display all contacts
app.get('/', (req, res) => {
    res.render('index', { contacts: contacts });
});

// POST route for adding new contact
app.post('/api/contact', (req, res) => {
    contacts.push({ name: req.body.name, phone_number: req.body.phone_number, address: req.body.address }); //after adding to the array go back to the root route
    res.redirect("/");
});

app.put('/api/contact', (req, res) => {
    let id = req.body.id;
    contacts[id].name = req.body.name;
    contacts[id].phone_number = req.body.phone_number;
    contacts[id].address = req.body.address;
    res.redirect("/");
});


// DELETE route for removing a contact
app.delete('/api/contact/', (req, res) => {
    var index = req.body.id
    contacts.splice(index, 1)
    res.redirect("/");
})

// Start the server
app.listen(config.ListeningPort, () => {
    winston.info(`Phonebook Interface run and listening on port ${config.ListeningPort} ...`);
});