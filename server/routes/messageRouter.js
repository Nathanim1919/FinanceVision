const express = require('express');
const router = express.Router();
const {createUserMessage,getMessages} = require('../controllers/messageController');

router.post('/sendMessage', createUserMessage);
router.get('/getMessage', getMessages);


module.exports = router;