import express from 'express';


const router = express.Router();

import { getIncomes, createIncome, updateIncome, deleteIncome } from '../controllers/incomeController.js';

router.get('/', getIncomes);
router.post('/', createIncome);
router.delete('/:id', deleteIncome);
router.patch('/:id', updateIncome);

export default router;