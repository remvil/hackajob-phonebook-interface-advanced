const express = require('express');
// const authenticate = require('../middleware/authenticate')
// const authorized = require('../middleware/authorize')

const contacts = require('../routes/contacts.js');
// const auth = require('../routes/authenticate');

module.exports = function(app) {
    app.use(express.json());

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.use('/api/contacts', contacts);
    // app.use('/api/policy', [authenticate, authorized], policies);
    // app.use('/api/authenticate', authenticate, auth);

    /** Route to localhost:3000/apidoc */
    app.use(express.static('public'));
}