const winston = require('winston');
const config = require('config');

module.exports = function() {
    // ERROR HANDLINGS
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: config.uncaughtExceptionsFilePath }));

    process.on('unhandledRejection', (ex) => { throw ex; });
    winston.add(winston.transports.File, { filename: config.logFilePath });
}