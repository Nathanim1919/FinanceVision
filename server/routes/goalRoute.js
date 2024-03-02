import express from 'express';
import { createGoal,getGoals, updateGoal } from '../controllers/goalController.js';

const router = express.Router();

router.post('/', createGoal);
router.get('/', getGoals);
router.post('/:id', updateGoal)


export default router;