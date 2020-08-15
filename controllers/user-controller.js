const { getUsersService } = require('../services/user-service');

exports.getUsers = (req, res) => {
    getUsersService()
        .then((users) => res.status(200).json({ users }))
        .catch((err) => res.status(400).json({ message: "Something went wrong", error: err.message }))
}