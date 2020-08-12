const { validationResult } = require("express-validator");
const { loginService, signUpService } = require("../services/auth-service");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) res.status(400).json({ message: "Invalid Details" })
    signUpService(req)
        .then((user) => {
            user.salt = undefined;
            user.encry_password = undefined;
            res.status(200).json({ message: "User created.", user })
        })
        .catch((err) => res.status(400).json({ message: "Failed to create user!", error: err.message }))
}

exports.login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ message: "Invalid Email or Password" });
    loginService(req, res)
        .then((user) => {
            if (!user.authenticate(req.body.password)) return res.status(401).json({ error: "Email or Password are incorrect" });
            const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
            res.status(200).json({ message: "Login Successful!", user, token })
        })
        .catch((err) => { res.status(400).json({ message: "User Not Found!", error: err.message }) })
}