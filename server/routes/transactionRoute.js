import express from 'express';
import { getTransactions } from '../controllers/transactionController.js';


/**
 * Express router for handling transaction routes.
 * @type {import('express').Router}
 */
const router = express.Router();

router.get('/', getTransactions);


export default router;