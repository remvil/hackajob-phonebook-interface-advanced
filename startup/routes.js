const express = require('express');
const authenticate = require('../middleware/authenticate')
const authorized = require('../middleware/authorize')

const users = require('../routes/users');
const policies = require('../routes/policies');
const auth = require('../routes/authenticate');

module.exports = function(app) {
    app.use(express.json());

    app.use('/api/user', users);
    app.use('/api/policy', [authenticate, authorized], policies);
    app.use('/api/authenticate', authenticate, auth);

    /** Route to localhost:3000/apidoc */
    app.use(express.static('public'));
}