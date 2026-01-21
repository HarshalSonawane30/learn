import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Users, MessageCircle, Bell, User, PlusSquare, LogOut, Settings, Briefcase } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Users, label: 'Network', path: '/network' },
    { icon: Briefcase, label: 'Career', path: '/career' },
    { icon: MessageCircle, label: 'Messages', path: '/chat' },
    { icon: Bell, label: 'Notifications', path: '/notifications', hasDropdown: true },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Search */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/home')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-white">L</span>
              </div>
              <span className="hidden md:block text-xl font-bold gradient-text">LetLearn</span>
            </button>
          </div>

          {/* Center: Navigation Items (Desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              if (item.hasDropdown) {
                return (
                  <div key={item.path} className="relative">
                    <button
                      onClick={() => {
                        setShowNotifications(!showNotifications);
                        setShowProfileMenu(false);
                      }}
                      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                        active ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <div className="relative">
                        <Icon className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">3</span>
                      </div>
                      <span className="text-xs font-medium">{item.label}</span>
                    </button>
                    
                    {/* Notifications Dropdown */}
                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 animate-fadeIn">
                        <div className="px-4 py-3 border-b border-gray-200">
                          <h3 className="font-bold text-gray-900">Notifications</h3>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                            <div className="flex gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-900"><span className="font-semibold">Rahul Sharma</span> accepted your connection</p>
                                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                            <div className="flex gap-3">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-900"><span className="font-semibold">Priya Patel</span> sent you a message</p>
                                <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                    active ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{item.label}</span>
                  {active && <div className="w-full h-0.5 bg-blue-600 rounded-full mt-1"></div>}
                </button>
              );
            })}
          </div>

          {/* Right: Create Post + Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/create-post')}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105"
            >
              <PlusSquare className="w-5 h-5" />
              <span>Create Post</span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2 transition-colors"
              >
                <img
                  src={currentUser?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-blue-200"
                />
                <span className="hidden md:block text-sm font-medium text-gray-700">{currentUser?.name || 'Me'}</span>
              </button>

              {/* Profile Menu Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 animate-fadeIn">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <img
                        src={currentUser?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"}
                        alt="Profile"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-bold text-gray-900">{currentUser?.name || 'User'}</p>
                        <p className="text-sm text-gray-500">{currentUser?.email || 'View Profile'}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">My Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate('/settings');
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                  </button>
                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-red-600"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
