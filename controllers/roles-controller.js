const { validationResult } = require('express-validator');
const { createRoleService, getRolesService, deleteRolesService, editRoleService, getRoleByUserId } = require('../services/roles-service');

exports.createRole = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: "All fields required", errors })
    createRoleService(req.body)
        .then((role) => res.status(200).json({ message: "Role Created!", role }))
        .catch((err) => res.status(400).json({ message: "Creating role failed", error: err.message }))
}

exports.editRole = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: "All fields required", errors })
    editRoleService({ _id: req.body._id }, req.body)
        .then((role) => res.status(200).json({ message: "Role Updated!", role }))
        .catch((err) => res.status(400).json({ message: "Updating role failed", error: err.message }))
}

exports.getRoles = (req, res) => {
    getRolesService()
        .then((roles) => res.status(200).json({ roles }))
        .catch((err) => res.status(400).json({ message: "Something went wrong", error: err.message }))
}

exports.getRoleByName = (req, res) => {
    getRoleByUserId(req.params.user_id)
        .then((roles) => res.status(200).json({ roles }))
        .catch((err) => res.status(400).json({ message: "Something went wrong", error: err.message }))
}

exports.deleteRoles = (req, res) => {
    query = {
        _id: {
            $in: req.body.ids
        }
    }
    deleteRolesService(query)
        .then(() => res.status(200).json({ messages: "Role(s) deleted successfully!" }))
        .catch((err) => res.status(400).json({ message: "Something went wrong", error: err.message }))
}