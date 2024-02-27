import express from 'express';
import { createExpense, getExpenses, deleteExpense } from '../controllers/expenseController.js';


const router = express.Router();


router.post('/', createExpense);
router.get('/', getExpenses);
router.post('/:id', deleteExpense);


export default router;