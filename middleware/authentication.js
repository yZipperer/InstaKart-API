const admin = require('../firebase');
const User = require('../models/user');

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

exports.adminCheck = async (req, res, next) => {
    const {email} = req.user;
    const admin = await User.findOne({email: email})
    .exec()

    if(admin.role !== "admin" || admin.role === "user"){
        res.status(403).json({
            err: "Access Denied"
        });
    } else{
        next();
    }
};