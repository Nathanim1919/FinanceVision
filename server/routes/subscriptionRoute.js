import express from 'express';

import {
  getSubscribers,
  subscribe
} from '../controllers/subscriptionController.js';

const router = express.Router();

router.post('/subscribe', subscribe);
router.get('/subscribers', getSubscribers);

export default router;