const admin = require('../firebase');

exports.authenticationCheck = (req, res, next) => {
    console.log(req.headers);
    next();
};