const User = require('../models/user');

exports.cUser = async (req, res) => {
    const {name, email, picture} = req.user;
    const user = await User.findOneAndUpdate({email: email}, {name: name, picture: picture}, {new: true});
    console.log("in");
    if(user){
        res.json(user);
        console.log("updated user", user);
    } else {
        const newUser = await User({
            name: name,
            email: email,
            picture: picture
        }).save();
        res.json(newUser);
        console.log("created user", newUser);
    }
};