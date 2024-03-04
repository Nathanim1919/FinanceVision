import express from "express";
import {getNotifications, readNotification} from '../controllers/notificationController.js';

const router = express.Router();


router.get('/', getNotifications);
router.patch('/:id', readNotification);


export default router;
