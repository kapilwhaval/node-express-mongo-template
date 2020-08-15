const express = require('express');
const router = express.Router();
const validator = require("../middlewares/validator");
const { createModule, getModules } = require('../controllers/module-controller');
const { createRole, getRoles, deleteRoles } = require('../controllers/roles-controller');
const { login, signup } = require('../controllers/auth-controllers');
const { checkAccountExist, isAuthorized } = require('../middlewares/auth-validator');
const { checkModuleExist } = require('../middlewares/module-validator');

//Auth
router.post('/login', [validator.email, validator.password], login);
router.post('/sign-up', [validator.firstName, validator.lastName, validator.email, validator.password, validator.phone], checkAccountExist, signup);

//Modules
router.get('/modules', isAuthorized, getModules);
router.post('/create-module', isAuthorized, [validator.title, validator.url, validator.id], checkModuleExist, createModule);

//Roles
router.get('/roles', isAuthorized, getRoles);
router.post('/create-role', isAuthorized, [validator.name, validator.description, validator.access_modules], createRole)
router.delete('/delete-roles', isAuthorized, [validator.array], deleteRoles)

module.exports = router;