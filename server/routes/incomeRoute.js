import express from 'express';


const router = express.Router();

import { getIncomes, createIncome, updateIncome, deleteIncome } from '../controllers/incomeController.js';

router.get('/', getIncomes);
router.post('/', createIncome);
router.patch('/:id', updateIncome);
router.delete('/:id', deleteIncome);

export default router;