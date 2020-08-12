const User = require('../models/user');

exports.signUpService = (req) => {
    return new Promise((resolve, reject) => {
        const user = new User(req.body);
        user.save((err, user) => {
            if (err || !user) reject(err)
            else resolve(user);
        })
    })
}

exports.loginService = (req, res) => {
    return new Promise((resolve, reject) => {
        const { email } = req.body;
        User.findOne({ email }, (err, user) => {
            if (err || !user) reject(err)
            resolve(user);
        })
    })
}