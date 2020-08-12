const express = require('express');
const authRouter = express.Router();
const validator = require("../middlewares/validator");
const { login, signup } = require('../controllers/auth-controllers');
const { checkAccountExist, isAuthorized } = require('../middlewares/auth-validator');

authRouter.post('/login', [validator.email, validator.password], login);
authRouter.post('/sign-up', [validator.firstName, validator.lastName, validator.email, validator.password, validator.phone], checkAccountExist, signup);

module.exports = authRouter;