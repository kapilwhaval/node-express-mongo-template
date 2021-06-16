const express = require('express');
const { generateToken, validateToken } = require('../helper/token');
const router = express.Router();

router.post('/login', generateToken);
router.post('/sign-up', validateToken, (req) => console.log(req.body));

module.exports = router;