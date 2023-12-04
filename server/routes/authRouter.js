// E:\Projects\portfolio projects\Personal-financial-Assistance\server\routes\authRouter.js
const express = require('express');
const router = express.Router();
const {verifyToken} = require('../utils/authonticateToken');
// const {
//     RegisterValidator,
//     loginValidator
// } = require('../utils/validator');
const {
    register,
    login,
    getUser
} = require('../controllers/authController');

router.post('/register', register); // Check this line
router.post('/verify', verifyToken)
router.post('/login', login);
router.get('/user/:id', getUser)

module.exports = router;
