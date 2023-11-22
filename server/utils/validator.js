const {
    body
} = require('express-validator');


export const RegisterValidator = [
    body('user.first_name', 'username does not Empty').not().isEmpty(),
    body('user.email', 'Invalid email').isEmail(),
    body('user.password', 'password does not Empty').not().isEmpty(),
    body('user.password', 'The minimum password length is 6 characters').isLength({min: 6}),
]

export const loginValidator = [
    body('email', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'The minimum password length is 6 characters').isLength({
        min: 6
    }),
]
