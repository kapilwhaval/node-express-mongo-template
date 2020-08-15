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

exports.deleteRolesService = (query) => {
    return new Promise((resolve, reject) => {
        Role.deleteMany(query, (err, result) => {
            if (err || !result) reject(err)
            else resolve(result);
        })
    })
}