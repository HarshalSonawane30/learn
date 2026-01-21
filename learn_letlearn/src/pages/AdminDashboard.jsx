import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, Flag, Settings, LogOut, Search, Trash2, UserX, Shield, Activity, TrendingUp, AlertTriangle, Database, Clock, MessageSquare, UserPlus, Eye, CheckCircle, XCircle } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveStats, setLiveStats] = useState({
    activeUsersNow: 342,
    postsToday: 127,
    newUsersToday: 45,
    commentsToday: 893
  });

  // Verify authentication on component mount
  useEffect(() => {
    const isAuth = localStorage.getItem('isAdminAuthenticated') === 'true';
    const loginTime = localStorage.getItem('adminLoginTime');
    
    if (!isAuth || !loginTime) {
      // Not authenticated, redirect to login
      navigate('/secure-admin-panel-l2', { replace: true });
      return;
    }
    
    // Check session expiry (30 minutes)
    const currentTime = Date.now();
    const sessionDuration = currentTime - parseInt(loginTime);
    const SESSION_EXPIRY = 30 * 60 * 1000; // 30 minutes
    
    if (sessionDuration > SESSION_EXPIRY) {
      // Session expired, clear and redirect
      localStorage.removeItem('isAdminAuthenticated');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminLoginTime');
      alert('Your session has expired. Please login again.');
      navigate('/secure-admin-panel-l2', { replace: true });
    }
  }, [navigate]);

  // Update time every second for real-time display
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Simulate real-time stats updates
  useEffect(() => {
    const statsInterval = setInterval(() => {
      setLiveStats(prev => ({
        activeUsersNow: prev.activeUsersNow + Math.floor(Math.random() * 5) - 2,
        postsToday: prev.postsToday + Math.floor(Math.random() * 3),
        newUsersToday: prev.newUsersToday + Math.floor(Math.random() * 2),
        commentsToday: prev.commentsToday + Math.floor(Math.random() * 10)
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(statsInterval);
  }, []);

  // Mock data
  const stats = {
    totalUsers: 1240,
    totalPosts: 5680,
    totalCommunities: 156,
    activeUsers: 342,
    flaggedPosts: 23,
    reportedUsers: 8,
    storageUsed: 2.4, // GB
    maxStorage: 10 // GB
  };

  // Flagged posts data
  const flaggedPosts = [
    { id: 101, title: 'Inappropriate Content', author: 'User123', reports: 5, status: 'pending' },
    { id: 102, title: 'Spam Post', author: 'User456', reports: 3, status: 'pending' },
    { id: 103, title: 'Offensive Language', author: 'User789', reports: 7, status: 'pending' },
  ];

  // Reported users data
  const reportedUsers = [
    { id: 1, name: 'Spam Bot', email: 'spam@bot.com', reports: 12, reason: 'Spamming', severity: 'high' },
    { id: 2, name: 'Fake Account', email: 'fake@user.com', reports: 8, reason: 'Multiple accounts', severity: 'medium' },
  ];

  // Real-time activity feed
  const recentActivity = [
    { id: 1, type: 'user', message: 'New user registered: Priya Sharma', time: '2 minutes ago', icon: UserPlus },
    { id: 2, type: 'post', message: 'New post created in Web Development', time: '5 minutes ago', icon: FileText },
    { id: 3, type: 'comment', message: '45 new comments across all posts', time: '8 minutes ago', icon: MessageSquare },
    { id: 4, type: 'user', message: 'New user registered: Arjun Patel', time: '12 minutes ago', icon: UserPlus },
    { id: 5, type: 'post', message: 'Post flagged for review', time: '15 minutes ago', icon: Flag },
    { id: 6, type: 'user', message: 'New user registered: Sneha Kumar', time: '18 minutes ago', icon: UserPlus },
  ];

  const users = [
    { id: 1, name: 'Priya Sharma', email: 'priya@example.com', joinDate: '2024-01-15', status: 'active', role: 'teacher' },
    { id: 2, name: 'Arjun Patel', email: 'arjun@example.com', joinDate: '2024-02-20', status: 'active', role: 'both' },
    { id: 3, name: 'Sneha Kumar', email: 'sneha@example.com', joinDate: '2024-01-10', status: 'active', role: 'teacher' },
    { id: 4, name: 'Rahul Verma', email: 'rahul@example.com', joinDate: '2024-03-05', status: 'active', role: 'learner' },
    { id: 5, name: 'Ananya Reddy', email: 'ananya@example.com', joinDate: '2024-02-15', status: 'inactive', role: 'both' },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/secure-admin-panel-l2');
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      alert(`User ${userId} deleted successfully`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-gradient-to-r from-blue-600 to-teal-600 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-white text-sm">
                <Clock className="w-4 h-4 inline mr-1" />
                {currentTime.toLocaleTimeString()}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-3">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              <Activity className="w-4 h-4" />
              Overview
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === 'users'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('users')}
            >
              <Users className="w-4 h-4" />
              Users ({stats.totalUsers})
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === 'posts'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('posts')}
            >
              <FileText className="w-4 h-4" />
              Posts ({stats.totalPosts})
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === 'moderation'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('moderation')}
            >
              <Flag className="w-4 h-4" />
              Moderation ({stats.flaggedPosts + stats.reportedUsers})
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>
      </nav>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
            
            {/* Live Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    Live
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                <p className="text-xs text-gray-500 mt-2">
                  <span className="text-green-600 font-semibold">{liveStats.activeUsersNow}</span> online now
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    +{liveStats.postsToday}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">Total Posts</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalPosts}</p>
                <p className="text-xs text-gray-500 mt-2">{liveStats.postsToday} posted today</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Flag className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="flex items-center gap-1 text-orange-600 text-sm font-semibold">
                    <AlertTriangle className="w-4 h-4" />
                    Urgent
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">Flagged Content</p>
                <p className="text-3xl font-bold text-gray-900">{stats.flaggedPosts}</p>
                <p className="text-xs text-gray-500 mt-2">{stats.reportedUsers} users reported</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    +{liveStats.commentsToday}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">Total Engagement</p>
                <p className="text-3xl font-bold text-gray-900">{liveStats.commentsToday}</p>
                <p className="text-xs text-gray-500 mt-2">Comments today</p>
              </div>
            </div>

            {/* Storage & Activity Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Storage Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Storage Usage</h3>
                </div>
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Used: {stats.storageUsed} GB</span>
                    <span className="text-sm text-gray-600">{stats.maxStorage} GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-teal-600 h-3 rounded-full transition-all"
                      style={{ width: `${(stats.storageUsed / stats.maxStorage) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  {((stats.storageUsed / stats.maxStorage) * 100).toFixed(1)}% of storage used
                </p>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Today's Activity</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">New Users</span>
                    <span className="text-lg font-bold text-green-600">+{liveStats.newUsersToday}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">New Posts</span>
                    <span className="text-lg font-bold text-blue-600">+{liveStats.postsToday}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Comments</span>
                    <span className="text-lg font-bold text-purple-600">+{liveStats.commentsToday}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Join Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{user.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            user.role === 'teacher' ? 'bg-blue-100 text-blue-700' :
                            user.role === 'both' ? 'bg-purple-100 text-purple-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.joinDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {user.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View user"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete user"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
                <UserX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No users found matching your search.</p>
              </div>
            )}
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="posts-section">
            <h2>Posts Management</h2>
            <div className="posts-stats">
              <div className="posts-stat-item">
                <p className="label">Total Posts Created</p>
                <p className="value">{stats.totalPosts}</p>
              </div>
              <div className="posts-stat-item">
                <p className="label">Posts Under Review</p>
                <p className="value">{stats.flaggedPosts}</p>
              </div>
              <div className="posts-stat-item">
                <p className="label">Avg. Engagement</p>
                <p className="value">84%</p>
              </div>
              <div className="posts-stat-item">
                <p className="label">Trending Topics</p>
                <p className="value">12</p>
              </div>
            </div>
            <div className="posts-info">
              <p>Manage all posts and content from your platform.</p>
              <div className="feature-list">
                <ul>
                  <li>✓ View all posts and their engagement metrics</li>
                  <li>✓ Remove inappropriate or flagged content</li>
                  <li>✓ Monitor trending topics and discussions</li>
                  <li>✓ Manage post categories and tags</li>
                  <li>✓ View post analytics and performance</li>
                </ul>
              </div>
              <button className="action-button">
                <FaFileAlt /> View All Posts
              </button>
            </div>
          </div>
        )}

        {/* Moderation Tab - NEW */}
        {activeTab === 'moderation' && (
          <div className="moderation-section">
            <h2>Content Moderation & Reports</h2>
            
            <div className="moderation-grid">
              <div className="moderation-box">
                <h3><FaFlag /> Flagged Posts ({stats.flaggedPosts})</h3>
                <div className="moderation-list">
                  {flaggedPosts.map((post) => (
                    <div key={post.id} className="moderation-item">
                      <div className="item-content">
                        <p className="item-title">{post.title}</p>
                        <p className="item-author">By: {post.author}</p>
                        <p className="item-reports">{post.reports} reports</p>
                      </div>
                      <div className="item-actions">
                        <span className={`status-badge status-${post.status}`}>{post.status}</span>
                        <button className="action-btn review-btn">Review</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="moderation-box">
                <h3><FaExclamationTriangle /> Reported Users ({stats.reportedUsers})</h3>
                <div className="moderation-list">
                  {reportedUsers.map((user) => (
                    <div key={user.id} className="moderation-item">
                      <div className="item-content">
                        <p className="item-title">{user.name}</p>
                        <p className="item-author">{user.email}</p>
                        <p className="item-reason">Reason: {user.reason}</p>
                      </div>
                      <div className="item-actions">
                        <span className={`severity-badge severity-${user.severity}`}>{user.severity}</span>
                        <button className="action-btn investigate-btn">Investigate</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="settings-section">
            <h2>Admin Settings</h2>
            <div className="settings-form">
              <div className="setting-group">
                <label>Platform Name</label>
                <input type="text" defaultValue="Learn & Let Learn" disabled />
              </div>

              <div className="setting-group">
                <label>Admin Email</label>
                <input type="email" defaultValue="admin@learnletlearn.com" disabled />
              </div>

              <div className="setting-group">
                <label>Maintenance Mode</label>
                <select defaultValue="off">
                  <option value="off">Off</option>
                  <option value="on">On</option>
                </select>
              </div>

              <div className="setting-group">
                <label>Change Admin Password</label>
                <input type="password" placeholder="Enter new password" disabled />
              </div>

              <button className="save-btn">
                <FaCog /> Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
