const User = require('../models/user');

exports.cUser = async (req, res) => {
    const {name, email, picture} = req.user;
    const user = await User.findOneAndUpdate({email: email}, {name: name, picture: picture}, {new: true});
    if(user){
        res.json(user);
    } else {
        const newUser = await User({
            name: name,
            email: email,
            picture: picture
        }).save();
        res.json(newUser);
    }
};

exports.currentUser = async (req, res) => {
    const {name, email} = req.user;
    User.findOne({email: email})
    .exec((err, user) => {
        if(err){
            throw new Error(err);
        }
        res.json(user);
    });
};