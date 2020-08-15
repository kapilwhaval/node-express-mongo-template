const { validationResult } = require("express-validator");
const { loginService, signUpService } = require("../services/auth-service");
const { getRoleByName } = require('../services/roles-service');
const { getModulesService } = require('../services/module-service');
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
    let user = "";
    let token = "";
    let access_modules = [];
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ message: "Invalid Email or Password" });
    loginService(req, res)
        .then((userInst) => {
            if (!userInst.authenticate(req.body.password)) return res.status(401).json({ error: "Email or Password are incorrect" });
            user = userInst;
            token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
            user.encry_password = undefined;
            user.salt = undefined;
            return user;
        })
        .then(user => {
            return getRoleByName(user.role)
        })
        .then((res) => {
            access_modules = res.access_modules;
            return res;
        })
        .then((res) => {
            return getModulesService()
        })
        .then(all_modules => {
            res.status(200).json({ message: "Login Successful!", user, token, access_modules, all_modules })
        })
        .catch((err) => { res.status(400).json({ message: "User Not Found!", error: err.message }) })
}