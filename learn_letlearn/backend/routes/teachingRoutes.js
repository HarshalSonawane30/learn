import express from 'express';
import {
  createTimeSlot,
  getTimeSlots,
  bookTimeSlot,
  getSessions,
  updateSessionStatus,
  rateSession
} from '../controllers/teachingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/timeslots', protect, createTimeSlot);
router.get('/timeslots/:userId', protect, getTimeSlots);
router.post('/book', protect, bookTimeSlot);
router.get('/sessions', protect, getSessions);
router.put('/sessions/:id/status', protect, updateSessionStatus);
router.post('/sessions/:id/rate', protect, rateSession);

export default router;
