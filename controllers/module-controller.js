const { validationResult } = require("express-validator");
const { createModuleService, getModulesService } = require('../services/module-service');

exports.createModule = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: "All fields required", errors })
    createModuleService(req.body)
        .then((module) => res.status(200).json({ message: "Module Created!", module }))
        .catch((err) => res.status(400).json({ message: "Creating module failed", error: err.message }))
}

exports.getModules = (req, res) => {
    getModulesService()
        .then((modules) => res.status(200).json({ modules }))
        .catch((err) => res.status(400).json({ message: "Something went wrong", error: err.message }))
}