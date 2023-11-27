// E:\Projects\portfolio projects\Personal-financial-Assistance\server\utils\validator.js

const {
    body
} = require('express-validator');

const registerValidator = [
    body('fullname').notEmpty().withMessage('Fullname is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({
        min: 6
    }).withMessage('Password must be at least 6 characters'),
];

const loginValidator = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({
        min: 6
    }).withMessage('Password must be at least 6 characters'),
];

module.exports = {
    registerValidator,
    loginValidator
};
