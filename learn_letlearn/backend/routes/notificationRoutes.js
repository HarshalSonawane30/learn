import express from 'express';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount
} from '../controllers/notificationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getNotifications);
router.get('/unread', protect, getUnreadCount);
router.post('/read/:id', protect, markAsRead);
router.post('/read-all', protect, markAllAsRead);
router.delete('/:id', protect, deleteNotification);

export default router;
