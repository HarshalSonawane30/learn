import express from 'express';
import {
  getUserById,
  updateUser,
  searchUsers,
  getSuggestions,
  sendConnectionRequest,
  acceptConnection,
  rejectConnection,
  getConnections
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/search', protect, searchUsers);
router.get('/suggestions', protect, getSuggestions);
router.get('/connections', protect, getConnections);
router.post('/connect', protect, sendConnectionRequest);
router.post('/accept', protect, acceptConnection);
router.post('/reject', protect, rejectConnection);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);

export default router;
