import {body, param} from 'express-validator.js';

const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must be lowercase")
            .isLength({min: 3})
            .withMessage("Username must be at least 3 characters long"),
        body("password").trim().notEmpty().withMessage("Password is required"),
    ]
}

const userLogginValidator = () => {
    return [
        body("email").optional().isEmail().withMessage("Email is invalid"),
        body("username").optional(),
        body("password").notEmpty().withMessage("Password is required")
    ]
}

const userForgotPasswordValidator = () => {
    return [
        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
    ];
}

const userResetForgottenPasswordValidator = () => {
    return [
        body("newPassword").notEmpty().withMessage("Password is required")];
}

export {
    userForgotPasswordValidator,
    userLogginValidator,
    userRegisterValidator,
    userResetForgottenPasswordValidator
}