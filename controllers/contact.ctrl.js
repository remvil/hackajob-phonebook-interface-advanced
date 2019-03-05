const config = require('config');
const service = require('../startup/service');
const _ = require('lodash/core');
const jwt = require('jsonwebtoken');

module.exports = {

    findUser: (req, res) => {
        const idRegExp = /[a-f\d]{8}-([a-f\d]{4}-){3}[a-f\d]{12}/;
        const filter = req.filter;
        /**
         * Get filtered data from clients url
         */
        var jObj = service.getData(config.clients_url)
            .then(res => {
                if (idRegExp.test(filter)) { // filter user by ID
                    console.log("finding : " + filter)
                    var result = _.filter(res.clients, { id: filter });
                    return result;
                } else { // filter user by Name
                    var result = _.filter(res.clients, { name: filter });
                    return result;
                }
            });
        return jObj
    },

    generateAuthToken: (userId, userRole) => {
        return jwt.sign({ _id: userId, isAdmin: userRole }, config.get('jwtPrivateKey'), {
            expiresIn: 86400 // expires in 24 hours
        });
    }
}