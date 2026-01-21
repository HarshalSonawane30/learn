import User from '../models/User.js';
import Notification from '../models/Notification.js';

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('followers', 'name avatar role')
      .populate('following', 'name avatar role')
      .select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = async (req, res) => {
  try {
    // Check if user is updating their own profile
    if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    const allowedUpdates = [
      'name', 'bio', 'avatar', 'skillsTeach', 'skillsLearn',
      'availability', 'certificates'
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Search users
// @route   GET /api/users/search
// @access  Private
export const searchUsers = async (req, res) => {
  try {
    const { query, role, skills } = req.query;
    
    let filter = { _id: { $ne: req.user._id } };

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { skillsTeach: { $in: [new RegExp(query, 'i')] } },
        { skillsLearn: { $in: [new RegExp(query, 'i')] } }
      ];
    }

    if (role && role !== 'all') {
      filter.role = role;
    }

    if (skills) {
      filter.skillsTeach = { $in: skills.split(',') };
    }

    const users = await User.find(filter)
      .select('-password')
      .limit(20)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user suggestions
// @route   GET /api/users/suggestions
// @access  Private
export const getSuggestions = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    
    // Get users not already connected
    const connectedUserIds = currentUser.connections
      .filter(c => c.status === 'accepted')
      .map(c => c.userId);

    const pendingUserIds = currentUser.connections
      .filter(c => c.status === 'pending')
      .map(c => c.userId);

    const excludeIds = [...connectedUserIds, ...pendingUserIds, req.user._id];

    // Find users with matching skills
    const suggestions = await User.find({
      _id: { $nin: excludeIds },
      $or: [
        { skillsTeach: { $in: currentUser.skillsLearn } },
        { skillsLearn: { $in: currentUser.skillsTeach } }
      ]
    })
    .select('-password')
    .limit(10)
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: suggestions.length,
      suggestions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Send connection request
// @route   POST /api/users/connect
// @access  Private
export const sendConnectionRequest = async (req, res) => {
  try {
    const { userId } = req.body;

    if (userId === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot connect with yourself'
      });
    }

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if already connected
    const currentUser = await User.findById(req.user._id);
    const existingConnection = currentUser.connections.find(
      c => c.userId.toString() === userId
    );

    if (existingConnection) {
      return res.status(400).json({
        success: false,
        message: 'Connection request already sent or users are connected'
      });
    }

    // Add to sender's connections
    currentUser.connections.push({
      userId: userId,
      status: 'pending'
    });
    await currentUser.save();

    // Add to receiver's connections
    targetUser.connections.push({
      userId: req.user._id,
      status: 'pending'
    });
    await targetUser.save();

    // Create notification
    const notification = await Notification.create({
      userId: userId,
      type: 'connection_request',
      message: `${req.user.name} sent you a connection request`,
      fromUser: req.user._id,
      link: `/profile/${req.user._id}`
    });

    // Emit socket event (handled in socket.io)
    if (global.io && targetUser.socketId) {
      global.io.to(targetUser.socketId).emit('notification', notification);
    }

    res.status(200).json({
      success: true,
      message: 'Connection request sent successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Accept connection request
// @route   POST /api/users/accept
// @access  Private
export const acceptConnection = async (req, res) => {
  try {
    const { userId } = req.body;

    const currentUser = await User.findById(req.user._id);
    const requesterUser = await User.findById(userId);

    if (!requesterUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update connection status for both users
    const currentUserConnection = currentUser.connections.find(
      c => c.userId.toString() === userId
    );
    const requesterConnection = requesterUser.connections.find(
      c => c.userId.toString() === req.user._id.toString()
    );

    if (!currentUserConnection || !requesterConnection) {
      return res.status(400).json({
        success: false,
        message: 'Connection request not found'
      });
    }

    currentUserConnection.status = 'accepted';
    currentUserConnection.connectedAt = new Date();
    requesterConnection.status = 'accepted';
    requesterConnection.connectedAt = new Date();

    await currentUser.save();
    await requesterUser.save();

    // Create notification
    const notification = await Notification.create({
      userId: userId,
      type: 'connection_accepted',
      message: `${req.user.name} accepted your connection request`,
      fromUser: req.user._id,
      link: `/profile/${req.user._id}`
    });

    // Emit socket event
    if (global.io && requesterUser.socketId) {
      global.io.to(requesterUser.socketId).emit('notification', notification);
    }

    res.status(200).json({
      success: true,
      message: 'Connection accepted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Reject connection request
// @route   POST /api/users/reject
// @access  Private
export const rejectConnection = async (req, res) => {
  try {
    const { userId } = req.body;

    const currentUser = await User.findById(req.user._id);
    const requesterUser = await User.findById(userId);

    if (!requesterUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Remove connection from both users
    currentUser.connections = currentUser.connections.filter(
      c => c.userId.toString() !== userId
    );
    requesterUser.connections = requesterUser.connections.filter(
      c => c.userId.toString() !== req.user._id.toString()
    );

    await currentUser.save();
    await requesterUser.save();

    res.status(200).json({
      success: true,
      message: 'Connection request rejected'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user connections
// @route   GET /api/users/connections
// @access  Private
export const getConnections = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'connections.userId',
        select: 'name avatar role skillsTeach isOnline lastSeen'
      });

    const acceptedConnections = user.connections
      .filter(c => c.status === 'accepted')
      .map(c => ({
        ...c.userId.toObject(),
        connectedAt: c.connectedAt
      }));

    res.status(200).json({
      success: true,
      count: acceptedConnections.length,
      connections: acceptedConnections
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
