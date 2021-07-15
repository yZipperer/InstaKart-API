const admin = require('../firebase');

exports.authenticationCheck = async (req, res, next) => {
    try{
        const fUser = await admin.auth().verifyIdToken(req.headers.authenticationtoken);
        req.user = fUser;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            err: "Invalid or expired token"
        });
    }
};