const Module = require('../models/module');

exports.checkModuleExist = (req, res, next) => {
    const { id } = req.body;
    Module.findOne({ id }, (err, module) => {
        if (module) return res.status(400).json({ message: "Module already exists!" })
        next();
    })
}