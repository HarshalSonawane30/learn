import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // User state
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Notifications state
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Chat state
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  // Skills state
  const [userSkills, setUserSkills] = useState({
    offered: [],
    wanted: [],
    verified: []
  });

  // Connections state
  const [connections, setConnections] = useState([]);
  const [suggestedMentors, setSuggestedMentors] = useState([]);
  const [suggestedLearners, setSuggestedLearners] = useState([]);

  // Initialize Socket.IO connection
  useEffect(() => {
    if (isAuthenticated && user) {
      const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001';
      
      try {
        let hasLoggedError = false;
        
        const newSocket = io(SOCKET_URL, {
          auth: { userId: user.id || user._id },
          reconnection: false, // Disable reconnection to prevent spam
          timeout: 5000
        });

        newSocket.on('connect', () => {
          console.log('✓ Backend connected');
        });

        newSocket.on('connect_error', (error) => {
          if (!hasLoggedError) {
            console.log('⚠ Backend offline - app running in offline mode');
            hasLoggedError = true;
          }
          // Silently fail - app works without backend
        });

        newSocket.on('notification', (notification) => {
          addNotification(notification);
        });

        newSocket.on('message', (message) => {
          addMessage(message);
        });

        newSocket.on('onlineUsers', (users) => {
          setOnlineUsers(users);
        });

        setSocket(newSocket);

        return () => {
          newSocket.disconnect();
        };
      } catch (error) {
        console.log('Socket initialization error (backend not available):', error.message);
        // Continue without socket - app works offline
      }
    }
  }, [isAuthenticated, user]);

  // Authentication methods
  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    if (socket) {
      socket.disconnect();
    }
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Notification methods
  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
    setUnreadCount(0);
  };

  // Message methods
  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const sendMessage = (recipientId, content) => {
    if (socket) {
      socket.emit('sendMessage', {
        senderId: user.id || user._id,
        recipientId,
        content,
        timestamp: new Date()
      });
    }
  };

  // Skills methods
  const addVerifiedSkill = (skill) => {
    setUserSkills(prev => ({
      ...prev,
      verified: [...prev.verified, skill]
    }));
  };

  const updateSkills = (type, skills) => {
    setUserSkills(prev => ({
      ...prev,
      [type]: skills
    }));
  };

  // Connection methods
  const addConnection = (connection) => {
    setConnections(prev => [...prev, connection]);
  };

  const removeConnection = (connectionId) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
  };

  const value = {
    // User
    user,
    isAuthenticated,
    login,
    logout,
    updateUser,
    
    // Notifications
    notifications,
    unreadCount,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    
    // Chat
    messages,
    onlineUsers,
    socket,
    sendMessage,
    addMessage,
    
    // Skills
    userSkills,
    addVerifiedSkill,
    updateSkills,
    
    // Connections
    connections,
    suggestedMentors,
    suggestedLearners,
    addConnection,
    removeConnection,
    setSuggestedMentors,
    setSuggestedLearners
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
