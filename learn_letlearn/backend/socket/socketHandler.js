import User from '../models/User.js';
import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js';
import Notification from '../models/Notification.js';

const setupSocketIO = (io) => {
  // Store online users
  const onlineUsers = new Map();

  io.on('connection', (socket) => {
    console.log(`✓ Socket connected: ${socket.id}`);

    // User connects
    socket.on('user_connected', async (userId) => {
      try {
        onlineUsers.set(userId, socket.id);
        
        // Update user's socket ID and online status
        await User.findByIdAndUpdate(userId, {
          socketId: socket.id,
          isOnline: true,
          lastSeen: new Date()
        });

        // Notify connections that user is online
        io.emit('user_online', userId);

        console.log(`User ${userId} connected`);
      } catch (error) {
        console.error('Error in user_connected:', error);
      }
    });

    // Join conversation room
    socket.on('joinRoom', (conversationId) => {
      socket.join(conversationId);
      console.log(`Socket ${socket.id} joined room: ${conversationId}`);
    });

    // Leave conversation room
    socket.on('leaveRoom', (conversationId) => {
      socket.leave(conversationId);
      console.log(`Socket ${socket.id} left room: ${conversationId}`);
    });

    // Send message
    socket.on('sendMessage', async (data) => {
      try {
        const { conversationId, senderId, receiverId, text, type, fileName, fileUrl, fileSize } = data;

        // Find or create conversation
        let conversation = await Conversation.findById(conversationId);
        
        if (!conversation) {
          conversation = await Conversation.create({
            participants: [senderId, receiverId]
          });
        }

        // Create message
        const message = await Message.create({
          conversationId: conversation._id,
          sender: senderId,
          receiver: receiverId,
          text,
          type: type || 'text',
          fileName,
          fileUrl,
          fileSize
        });

        await message.populate('sender', 'name avatar');
        await message.populate('receiver', 'name avatar');

        // Update conversation
        conversation.lastMessage = {
          text: text.substring(0, 50),
          sender: senderId,
          createdAt: new Date()
        };

        // Update unread count
        const currentUnread = conversation.unreadCount.get(receiverId) || 0;
        conversation.unreadCount.set(receiverId, currentUnread + 1);
        await conversation.save();

        // Emit to room
        io.to(conversationId).emit('receiveMessage', message);

        // Send to receiver if online
        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('newMessage', {
            conversationId: conversation._id,
            message
          });

          // Create notification
          const notification = await Notification.create({
            userId: receiverId,
            type: 'message',
            message: `New message from ${message.sender.name}`,
            fromUser: senderId,
            link: `/chat?user=${senderId}`
          });

          io.to(receiverSocketId).emit('notification', notification);
        }

        console.log('Message sent:', message._id);
      } catch (error) {
        console.error('Error in sendMessage:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Typing indicator
    socket.on('typing', (data) => {
      const { conversationId, userId, receiverId } = data;
      const receiverSocketId = onlineUsers.get(receiverId);
      
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('userTyping', {
          conversationId,
          userId
        });
      }
    });

    // Stop typing indicator
    socket.on('stopTyping', (data) => {
      const { conversationId, userId, receiverId } = data;
      const receiverSocketId = onlineUsers.get(receiverId);
      
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('userStoppedTyping', {
          conversationId,
          userId
        });
      }
    });

    // Mark messages as read
    socket.on('markAsRead', async (data) => {
      try {
        const { conversationId, userId } = data;

        await Message.updateMany(
          {
            conversationId,
            receiver: userId,
            isRead: false
          },
          {
            isRead: true,
            readAt: new Date()
          }
        );

        // Update conversation unread count
        const conversation = await Conversation.findById(conversationId);
        if (conversation) {
          conversation.unreadCount.set(userId, 0);
          await conversation.save();
        }

        io.to(conversationId).emit('messagesRead', { userId });
      } catch (error) {
        console.error('Error in markAsRead:', error);
      }
    });

    // Disconnect
    socket.on('disconnect', async () => {
      try {
        // Find user by socket ID
        let disconnectedUserId = null;
        for (const [userId, socketId] of onlineUsers.entries()) {
          if (socketId === socket.id) {
            disconnectedUserId = userId;
            break;
          }
        }

        if (disconnectedUserId) {
          onlineUsers.delete(disconnectedUserId);

          // Update user's online status
          await User.findByIdAndUpdate(disconnectedUserId, {
            isOnline: false,
            lastSeen: new Date(),
            socketId: null
          });

          // Notify connections that user is offline
          io.emit('user_offline', disconnectedUserId);

          console.log(`User ${disconnectedUserId} disconnected`);
        }

        console.log(`Socket disconnected: ${socket.id}`);
      } catch (error) {
        console.error('Error in disconnect:', error);
      }
    });

    // Get online users
    socket.on('getOnlineUsers', () => {
      const onlineUserIds = Array.from(onlineUsers.keys());
      socket.emit('onlineUsers', onlineUserIds);
    });
  });

  return io;
};

export default setupSocketIO;
