import express from 'express';
import { createGoal,getGoals } from '../controllers/goalController.js';

const router = express.Router();

router.post('/', createGoal);
router.get('/', getGoals);


export default router;