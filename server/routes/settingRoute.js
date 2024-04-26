import express from 'express';
import { updateSettings } from '../controllers/settingController.js';
const router = express.Router();

router.post('/', updateSettings);


export default router;