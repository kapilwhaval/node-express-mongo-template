const { validationResult } = require('express-validator');
const { getUsersService, deleteUsersService, editUserService } = require('../services/user-service');

exports.getUsers = (req, res) => {
    getUsersService()
        .then((users) => res.status(200).json({ users }))
        .catch((err) => res.status(400).json({ message: "Something went wrong", error: err.message }))
}

exports.deleteUsers = (req, res) => {
    query = {
        _id: {
            $in: req.body.ids
        }
    }
    deleteUsersService(query)
        .then(() => res.status(200).json({ messages: "User(s) deleted successfully!" }))
        .catch((err) => res.status(400).json({ message: "Something went wrong", error: err.message }))
}

exports.editUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: "All fields required", errors })
    editUserService({ _id: req.body._id }, req.body)
        .then((role) => res.status(200).json({ message: "User Updated!", role }))
        .catch((err) => res.status(400).json({ message: "Updating user failed", error: err.message }))
}