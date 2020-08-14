const express = require('express');
const router = express.Router();
const validator = require("../middlewares/validator");
const { createModule, getModules } = require('../controllers/module-controller');
const { login, signup } = require('../controllers/auth-controllers');
const { checkAccountExist, isAuthorized } = require('../middlewares/auth-validator');
const { checkModuleExist } = require('../middlewares/module-validator');

//Auth
router.post('/login', [validator.email, validator.password], login);
router.post('/sign-up', [validator.firstName, validator.lastName, validator.email, validator.password, validator.phone], checkAccountExist, signup);

//Modules
router.post('/create-module', isAuthorized, [validator.title, validator.url, validator.id], checkModuleExist, createModule);
router.get('/modules', isAuthorized, getModules);

module.exports = router;