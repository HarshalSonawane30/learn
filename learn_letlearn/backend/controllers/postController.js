import Post from '../models/Post.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { uploadToCloudinary, getFileUrl } from '../utils/fileUpload.js';

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    let mediaUrl = null;
    let mediaType = null;

    // Handle file upload if media is provided
    if (req.file) {
      const fileUrl = await getFileUrl(req.file.filename); 
      mediaUrl = fileUrl;
      
      // Determine media type from file mimetype
      if (req.file.mimetype.startsWith('image/')) {
        mediaType = 'image';
      } else if (req.file.mimetype.startsWith('video/')) {
        mediaType = 'video';
      }
    }

    if (!content && !mediaUrl) {
      return res.status(400).json({
        success: false,
        message: 'Post must have content or media'
      });
    }

    const post = await Post.create({
      userId: req.user._id,
      content: content || '',
      mediaUrl,
      mediaType
    });

    // Populate user details
    await post.populate('userId', 'name avatar role');

    // Add post to user's posts array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { posts: post._id }
    });

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get feed posts
// @route   GET /api/posts/feed
// @access  Private
export const getFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const currentUser = await User.findById(req.user._id);
    
    // Get posts from connections and own posts
    const connectedUserIds = currentUser.connections
      .filter(c => c.status === 'accepted')
      .map(c => c.userId);

    const feedUserIds = [...connectedUserIds, req.user._id];

    const posts = await Post.find({
      userId: { $in: feedUserIds },
      isReported: false
    })
      .populate('userId', 'name avatar role verifiedSkills')
      .populate('comments.userId', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments({
      userId: { $in: feedUserIds },
      isReported: false
    });

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get post by ID
// @route   GET /api/posts/:id
// @access  Private
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('userId', 'name avatar role verifiedSkills')
      .populate('comments.userId', 'name avatar');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.status(200).json({
      success: true,
      post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Like/Unlike a post
// @route   POST /api/posts/:id/like
// @access  Private
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const likeIndex = post.likes.indexOf(req.user._id);

    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
      await post.save();

      return res.status(200).json({
        success: true,
        message: 'Post unliked',
        likes: post.likes.length,
        isLiked: false
      });
    } else {
      // Like
      post.likes.push(req.user._id);
      await post.save();

      // Create notification if not own post
      if (post.userId.toString() !== req.user._id.toString()) {
        const notification = await Notification.create({
          userId: post.userId,
          type: 'post_like',
          message: `${req.user.name} liked your post`,
          fromUser: req.user._id,
          link: `/posts/${post._id}`
        });

        // Emit socket event
        const postOwner = await User.findById(post.userId);
        if (global.io && postOwner.socketId) {
          global.io.to(postOwner.socketId).emit('notification', notification);
        }
      }

      return res.status(200).json({
        success: true,
        message: 'Post liked',
        likes: post.likes.length,
        isLiked: true
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Comment on a post
// @route   POST /api/posts/:id/comment
// @access  Private
export const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Comment text is required'
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    post.comments.push({
      userId: req.user._id,
      text: text.trim()
    });

    await post.save();
    await post.populate('comments.userId', 'name avatar');

    // Create notification if not own post
    if (post.userId.toString() !== req.user._id.toString()) {
      const notification = await Notification.create({
        userId: post.userId,
        type: 'post_comment',
        message: `${req.user.name} commented on your post`,
        fromUser: req.user._id,
        link: `/posts/${post._id}`
      });

      // Emit socket event
      const postOwner = await User.findById(post.userId);
      if (global.io && postOwner.socketId) {
        global.io.to(postOwner.socketId).emit('notification', notification);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Comment added successfully',
      comments: post.comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Save/Unsave a post
// @route   POST /api/posts/:id/save
// @access  Private
export const savePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const saveIndex = post.savedBy.indexOf(req.user._id);

    if (saveIndex > -1) {
      // Unsave
      post.savedBy.splice(saveIndex, 1);
      await post.save();

      return res.status(200).json({
        success: true,
        message: 'Post unsaved',
        isSaved: false
      });
    } else {
      // Save
      post.savedBy.push(req.user._id);
      await post.save();

      return res.status(200).json({
        success: true,
        message: 'Post saved',
        isSaved: true
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get saved posts
// @route   GET /api/posts/saved
// @access  Private
export const getSavedPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      savedBy: req.user._id
    })
      .populate('userId', 'name avatar role verifiedSkills')
      .populate('comments.userId', 'name avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if user owns the post or is admin
    if (post.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      });
    }

    await post.deleteOne();

    // Remove from user's posts array
    await User.findByIdAndUpdate(post.userId, {
      $pull: { posts: post._id }
    });

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Report post
// @route   POST /api/posts/:id/report
// @access  Private
export const reportPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    post.reportCount += 1;
    
    // Auto-flag if reported multiple times
    if (post.reportCount >= 3) {
      post.isReported = true;
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: 'Post reported successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
