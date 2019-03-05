var fetch = require('node-fetch')
const winston = require('winston');

module.exports = {
    getData: (url) => {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    }
}