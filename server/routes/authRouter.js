const {validationResult} = require('express-validator');
const express = require('express');
const router = express.Router();
const {
    RegisterValidator,
    loginValidator
} = require('../utils/validator')


router.post('/register',RegisterValidator, (req, res)=>{

});
router.post('/login',loginValidator, (req, res)=>{

});