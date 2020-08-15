const User = require('../models/user');

exports.getUsersService = (req, res) => {
    return new Promise((resolve, reject) => {
        User.find().select(['-encry_password', '-salt']).exec((err, users) => {
            if (err || !users) reject(err)
            else resolve(users)
        })
    })
}

exports.deleteUsersService = (query) => {
    return new Promise((resolve, reject) => {
        User.deleteMany(query, (err, result) => {
            if (err || !result) reject(err)
            else resolve(result);
        })
    })
}

exports.editUserService = (query, data) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(query, { $set: data }, { new: true, useFindAndModify: false }, (err, user) => {
            if (err || !user) reject(err)
            resolve(user);
        })
    })
}