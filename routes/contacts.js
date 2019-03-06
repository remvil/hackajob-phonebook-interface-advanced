// const userCtrl = require('../controllers/user.ctrl.js')
const express = require('express')
const router = express.Router()

/**
 * @api {get} api/contacts/ Request all contacts
 * @apiVersion 1.0.0
 * @apiName Get All Contacts
 * @apiGroup Contact
 * @apiDescription Returns all contacts in the Phonebook
 *
 * @apiParam none.
 * @apiSuccess {Object} All contacts in the phonebook. 
 */
router.get('/', async(req, res) => {
    // console.log(result);
    res.send(result);
});

router.post('/', function(req, res) {
    res.render('index')
});
module.exports = router