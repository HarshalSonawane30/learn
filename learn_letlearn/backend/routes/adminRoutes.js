import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  blockUser,
  deleteUser,
  getAllPosts,
  deletePost,
  getAnalytics
} from '../controllers/adminController.js';
import { protect, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(protect, isAdmin);

router.get('/dashboard', getDashboardStats);
router.get('/users', getAllUsers);
router.put('/users/:id/block', blockUser);
router.delete('/users/:id', deleteUser);
router.get('/posts', getAllPosts);
router.delete('/posts/:id', deletePost);
router.get('/analytics', getAnalytics);

export default router;
