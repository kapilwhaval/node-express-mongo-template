const Role = require('../models/role');

exports.createRoleService = (data) => {
    return new Promise((resolve, reject) => {
        const role = new Role(data)
        role.save((err, role) => {
            if (err || !role) reject(err)
            else resolve(role);
        })
    })
}

exports.getRolesService = () => {
    return new Promise((resolve, reject) => {
        Role.find((err, roles) => {
            if (err || !roles) reject(err)
            else resolve(roles);
        })
    })
}

exports.getRoleByName = (name) => {
    return new Promise((resolve, reject) => {
        Role.findOne({ name }, (err, role) => {
            if (err || !role) resolve([])
            resolve(role);
        })
    })
}

exports.deleteRolesService = (query) => {
    return new Promise((resolve, reject) => {
        Role.deleteMany(query, (err, result) => {
            if (err || !result) reject(err)
            else resolve(result);
        })
    })
}

exports.editRoleService = (query, data) => {
    return new Promise((resolve, reject) => {
        Role.findByIdAndUpdate(query, { $set: data }, { new: true, useFindAndModify: false }, (err, user) => {
            if (err || !user) reject(err)
            resolve(user);
        })
    })
}