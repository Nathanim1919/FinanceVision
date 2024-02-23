import { validationResult } from "express-validator";


export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()){
        return next()
    } else {
        const extractedErrors = []
        errors.array().map((err)=>extractedErrors.push({[err.path]: err.msg}));

        // 422: Unprocessable Entity
        res.status(422).json({
            message:"Received data is not valid"
        })
    }
}