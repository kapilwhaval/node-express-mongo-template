const User = require('../models/user');
const expressJwt = require('express-jwt');

exports.checkAccountExist = (req, res, next) => {
    const { email } = req.body;
    User.findOne({ email }, (err, user) => {
        if (user) return res.status(400).json({ message: "User already exists!" })
        next();
    })
}

exports.isAuthorized = expressJwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ['HS256']
});