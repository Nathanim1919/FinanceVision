import express from 'express';
import { getIncomes, createIncome, updateIncome, deleteIncome } from '../controllers/incomeController.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';


const router = express.Router();

//  /api/v1/incomes
router.get('/', getIncomes);
router.post('/', createIncome);
router.post('/:id', deleteIncome);
router.patch('/:id', updateIncome);

export default router;