import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import {
  FaBell,
  FaUserPlus,
  FaHeart,
  FaComment,
  FaCheckCircle,
  FaStar,
  FaEnvelope,
  FaTrash,
  FaCheck,
  FaFilter
} from 'react-icons/fa';
import './Notifications.css';

const Notifications = () => {
  const navigate = useNavigate();
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead
  } = useAppContext();

  const [filter, setFilter] = useState('all'); // all, unread, read

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'connection':
        return <FaUserPlus className="notif-icon connection" />;
      case 'like':
        return <FaHeart className="notif-icon like" />;
      case 'comment':
        return <FaComment className="notif-icon comment" />;
      case 'skill_verified':
        return <FaCheckCircle className="notif-icon verified" />;
      case 'skill_request':
        return <FaStar className="notif-icon skill" />;
      case 'message':
        return <FaEnvelope className="notif-icon message" />;
      case 'success':
        return <FaCheckCircle className="notif-icon success" />;
      default:
        return <FaBell className="notif-icon default" />;
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diffInMs = now - notifTime;
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return notifTime.toLocaleDateString();
  };

  // Filter notifications
  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  // Mock notifications if empty
  const mockNotifications = notifications.length === 0 ? [
    {
      id: 1,
      type: 'connection',
      title: 'New Connection Request',
      message: 'Sarah Chen wants to connect with you',
      timestamp: new Date(Date.now() - 300000),
      read: false,
      userId: 1
    },
    {
      id: 2,
      type: 'like',
      title: 'Post Liked',
      message: 'Alex Kumar liked your post about React Hooks',
      timestamp: new Date(Date.now() - 1800000),
      read: false
    },
    {
      id: 3,
      type: 'comment',
      title: 'New Comment',
      message: 'Maria Garcia commented on your post',
      timestamp: new Date(Date.now() - 3600000),
      read: true
    },
    {
      id: 4,
      type: 'skill_verified',
      title: 'Skill Verified!',
      message: 'Congratulations! You passed the React test',
      timestamp: new Date(Date.now() - 7200000),
      read: true
    },
    {
      id: 5,
      type: 'message',
      title: 'New Message',
      message: 'You have a new message from John Smith',
      timestamp: new Date(Date.now() - 86400000),
      read: true
    }
  ] : filteredNotifications;

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification) => {
    markNotificationAsRead(notification.id);
    
    // Navigate based on notification type
    switch (notification.type) {
      case 'connection':
        if (notification.userId) {
          navigate(`/user/${notification.userId}`);
        } else {
          navigate('/connections');
        }
        break;
      case 'like':
      case 'comment':
        navigate('/home');
        break;
      case 'skill_verified':
        navigate('/profile');
        break;
      case 'message':
        navigate('/messages');
        break;
      default:
        break;
    }
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div className="header-title">
          <FaBell size={32} />
          <div>
            <h1>Notifications</h1>
            <p>{unreadCount} unread notifications</p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            className="mark-all-read"
            onClick={markAllNotificationsAsRead}
          >
            <FaCheck /> Mark all as read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button
          className={`tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
          <span className="count">{notifications.length || 5}</span>
        </button>
        <button
          className={`tab ${filter === 'unread' ? 'active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread
          {unreadCount > 0 && <span className="count">{unreadCount}</span>}
        </button>
        <button
          className={`tab ${filter === 'read' ? 'active' : ''}`}
          onClick={() => setFilter('read')}
        >
          Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {mockNotifications.length === 0 ? (
          <div className="no-notifications">
            <FaBell size={64} color="#ccc" />
            <h3>No notifications yet</h3>
            <p>When you get notifications, they'll show up here</p>
          </div>
        ) : (
          mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${
                !notification.read ? 'unread' : ''
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="notif-icon-wrapper">
                {getNotificationIcon(notification.type)}
              </div>

              <div className="notif-content">
                <h4>{notification.title}</h4>
                <p>{notification.message}</p>
                <span className="notif-time">
                  {formatTime(notification.timestamp)}
                </span>
              </div>

              {!notification.read && <div className="unread-dot" />}

              <button
                className="notif-action"
                onClick={(e) => {
                  e.stopPropagation();
                  markNotificationAsRead(notification.id);
                }}
              >
                {!notification.read ? (
                  <FaCheck title="Mark as read" />
                ) : (
                  <FaTrash title="Delete" color="#dc3545" />
                )}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      {mockNotifications.length > 0 && (
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <button
              className="action-card"
              onClick={() => navigate('/connections')}
            >
              <FaUserPlus />
              <span>View Connections</span>
            </button>
            <button
              className="action-card"
              onClick={() => navigate('/messages')}
            >
              <FaEnvelope />
              <span>Go to Messages</span>
            </button>
            <button
              className="action-card"
              onClick={() => navigate('/profile')}
            >
              <FaStar />
              <span>My Profile</span>
            </button>
            <button
              className="action-card"
              onClick={() => navigate('/home')}
            >
              <FaBell />
              <span>View Feed</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
