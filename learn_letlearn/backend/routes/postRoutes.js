import express from 'express';
import {
  createPost,
  getFeed,
  getPostById,
  likePost,
  commentOnPost,
  savePost,
  getSavedPosts,
  deletePost,
  reportPost
} from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', protect, upload.single('media'), createPost);
router.get('/feed', protect, getFeed);
router.get('/saved', protect, getSavedPosts);
router.get('/:id', protect, getPostById);
router.post('/:id/like', protect, likePost);
router.post('/:id/comment', protect, commentOnPost);
router.post('/:id/save', protect, savePost);
router.post('/:id/report', protect, reportPost);
router.delete('/:id', protect, deletePost);

export default router;
