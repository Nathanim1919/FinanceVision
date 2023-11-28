// E:\Projects\portfolio projects\Personal-financial-Assistance\server\routes\authRouter.js
const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../utils/authonticateToken');
// const {
//     RegisterValidator,
//     loginValidator
// } = require('../utils/validator');
const {
    register,
    login
} = require('../controllers/authController');

router.post('/register', register); // Check this line
router.post('/login', login);
router.get('/profile', authenticateToken, )

module.exports = router;
