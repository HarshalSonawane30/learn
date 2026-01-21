import express from 'express';
import {
  getSkillTest,
  submitSkillTest,
  getUserResults,
  getAllTests
} from '../controllers/skillController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/tests', protect, getAllTests);
router.get('/tests/:skillName', protect, getSkillTest);
router.post('/submit', protect, submitSkillTest);
router.get('/results/:userId', protect, getUserResults);

export default router;
