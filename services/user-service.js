const User = require('../models/user');

exports.getUsersService = (req, res) => {
    return new Promise((resolve, reject) => {
        User.find().select(['-encry_password', '-salt']).exec((err, users) => {
            if (err || !users) reject(err)
            else resolve(users)
        })
    })
}