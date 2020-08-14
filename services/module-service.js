const Module = require('../models/module');

exports.createModuleService = (data) => {
    return new Promise((resolve, reject) => {
        const module = new Module(data);
        module.save((err, module) => {
            if (err || !module) reject(err)
            else resolve(module);
        })
    })
}

exports.getModulesService = () => {
    return new Promise((resolve, reject) => {
        Module.find((err, module) => {
            if (err || !module) reject(err)
            else resolve(module);
        })
    })
}