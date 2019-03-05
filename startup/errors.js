module.exports = errorHandler;

function errorHandler(err, req, res, next) {

    // Custom errors
    if (typeof(err) === 'string') return res.status(400).json({ message: err });

    // Auth error
    if (err.name === 'UnauthorizedError') return res.status(401).json({ message: 'Invalid Token' });
}