import express from 'express';
import { createMessage , aiMessage, getMessages} from '../controllers/chatController.js';


const router = express.Router();


router.get('/', getMessages);
router.post('/createMessage', createMessage);
router.post('/saveAiMessage', aiMessage);

export default router;