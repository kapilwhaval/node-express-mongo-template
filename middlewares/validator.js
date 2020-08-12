const { check } = require('express-validator');

exports.firstName = check("first_name", "First name should be atleast 3 characters").isLength({ min: 3 });
exports.lastName = check("last_name", "Last name should be atleast 3 characters").isLength({ min: 3 });
exports.email = check("email", "Invalid email address").isEmail();
exports.password = check("password", "Password should be more than 5 chars").isLength({ min: 5 });
exports.phone = check("phone", "Phone Number should be 10 digits").isLength({ min: 10 });