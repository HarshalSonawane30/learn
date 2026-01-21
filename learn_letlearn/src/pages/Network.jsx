import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserPlus, UserCheck, MessageCircle, UserX, TrendingUp, GraduationCap, BookOpen, MapPin, Star } from 'lucide-react';
import Navbar from '../components/common/Navbar';

function Network() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('suggestions'); // suggestions, connections, requests

  const suggestions = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'teacher',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      title: 'Senior React Developer',
      company: 'Tech Solutions',
      location: 'Mumbai, India',
      mutualConnections: 12,
      skills: ['React', 'TypeScript', 'Node.js'],
      rating: 4.9,
      students: 156
    },
    {
      id: 2,
      name: 'Arjun Patel',
      role: 'both',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
      title: 'Data Scientist & Mentor',
      company: 'AI Labs',
      location: 'Bangalore, India',
      mutualConnections: 8,
      skills: ['Python', 'Machine Learning', 'TensorFlow'],
      rating: 4.8,
      students: 234
    },
    {
      id: 3,
      name: 'Sneha Kumar',
      role: 'teacher',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
      title: 'UI/UX Designer',
      company: 'Design Studio',
      location: 'Pune, India',
      mutualConnections: 15,
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      rating: 4.7,
      students: 89
    },
    {
      id: 4,
      name: 'Rahul Verma',
      role: 'teacher',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
      title: 'Backend Developer',
      company: 'Enterprise Solutions',
      location: 'Hyderabad, India',
      mutualConnections: 20,
      skills: ['Java', 'Spring Boot', 'Microservices'],
      rating: 4.9,
      students: 178
    },
    {
      id: 5,
      name: 'Ananya Reddy',
      role: 'both',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
      title: 'AI/ML Engineer',
      company: 'TechCorp',
      location: 'Chennai, India',
      mutualConnections: 10,
      skills: ['Deep Learning', 'NLP', 'Computer Vision'],
      rating: 4.8,
      students: 145
    },
    {
      id: 6,
      name: 'Vikram Singh',
      role: 'teacher',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
      title: 'DevOps Engineer',
      company: 'Cloud Systems',
      location: 'Delhi, India',
      mutualConnections: 18,
      skills: ['AWS', 'Docker', 'Kubernetes'],
      rating: 4.9,
      students: 203
    }
  ];

  const connections = [
    {
      id: 7,
      name: 'Kavya Iyer',
      role: 'both',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavya',
      title: 'Full Stack Developer',
      company: 'StartupHub',
      location: 'Kochi, India',
      connectedSince: '2024',
      skills: ['JavaScript', 'Node.js', 'MongoDB']
    },
    {
      id: 8,
      name: 'Rohan Mehta',
      role: 'teacher',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
      title: 'ML Researcher',
      company: 'Research Lab',
      location: 'Ahmedabad, India',
      connectedSince: '2023',
      skills: ['PyTorch', 'Research', 'AI']
    },
    {
      id: 9,
      name: 'Neha Gupta',
      role: 'learner',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neha',
      title: 'Software Developer',
      company: 'Tech Industries',
      location: 'Noida, India',
      connectedSince: '2024',
      skills: ['C++', 'DSA', 'Algorithms']
    }
  ];

  const pendingRequests = [
    {
      id: 10,
      name: 'Amit Kumar',
      role: 'teacher',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
      title: 'Blockchain Developer',
      company: 'Crypto Solutions',
      location: 'Mumbai, India',
      mutualConnections: 5,
      requestedAt: '2 days ago'
    },
    {
      id: 11,
      name: 'Divya Nair',
      role: 'both',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Divya',
      title: 'Product Manager',
      company: 'Product Co',
      location: 'Bangalore, India',
      mutualConnections: 7,
      requestedAt: '1 week ago'
    }
  ];

  const getRoleBadge = (role) => {
    const badges = {
      teacher: { icon: GraduationCap, class: 'bg-blue-100 text-blue-700', text: 'Teacher' },
      learner: { icon: BookOpen, class: 'bg-green-100 text-green-700', text: 'Learner' },
      both: { icon: Users, class: 'bg-purple-100 text-purple-700', text: 'Both' }
    };
    const badge = badges[role] || badges.learner;
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.class}`}>
        <Icon className="w-3 h-3" />
        {badge.text}
      </span>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pb-8 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white mb-6">
            <h1 className="text-3xl font-bold mb-2">Grow Your Network</h1>
            <p className="text-blue-100">Connect with teachers and learners to expand your learning community</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Connections</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{connections.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending Requests</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{pendingRequests.length}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Suggestions</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{suggestions.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('suggestions')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'suggestions'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Suggestions ({suggestions.length})
              </button>
              <button
                onClick={() => setActiveTab('connections')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'connections'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Connections ({connections.length})
              </button>
              <button
                onClick={() => setActiveTab('requests')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'requests'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Requests ({pendingRequests.length})
              </button>
            </div>
          </div>

          {/* Suggestions Tab */}
          {activeTab === 'suggestions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestions.map((person) => (
                <div
                  key={person.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="w-16 h-16 rounded-full cursor-pointer"
                        onClick={() => navigate(`/profile/${person.id}`)}
                      />
                      {getRoleBadge(person.role)}
                    </div>

                    <h3
                      className="font-bold text-lg text-gray-900 cursor-pointer hover:text-blue-600 mb-1"
                      onClick={() => navigate(`/profile/${person.id}`)}
                    >
                      {person.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{person.title}</p>
                    <p className="text-sm text-gray-500 mb-3">{person.company}</p>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{person.location}</span>
                    </div>

                    {person.rating && (
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{person.rating}</span>
                        </div>
                        <span>{person.students} students</span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {person.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {person.mutualConnections > 0 && (
                      <p className="text-xs text-gray-500 mb-4">
                        {person.mutualConnections} mutual connections
                      </p>
                    )}

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        Connect
                      </button>
                      <button
                        onClick={() => navigate(`/profile/${person.id}`)}
                        className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Connections Tab */}
          {activeTab === 'connections' && (
            <div className="space-y-4">
              {connections.map((person) => (
                <div
                  key={person.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="w-16 h-16 rounded-full cursor-pointer"
                        onClick={() => navigate(`/profile/${person.id}`)}
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className="font-bold text-lg text-gray-900 cursor-pointer hover:text-blue-600"
                            onClick={() => navigate(`/profile/${person.id}`)}
                          >
                            {person.name}
                          </h3>
                          {getRoleBadge(person.role)}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{person.title}</p>
                        <p className="text-sm text-gray-500 mb-2">{person.company}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {person.location}
                          </span>
                          <span>Connected since {person.connectedSince}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/chat?user=${person.id}`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Message
                      </button>
                      <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              {pendingRequests.map((person) => (
                <div
                  key={person.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="w-16 h-16 rounded-full cursor-pointer"
                        onClick={() => navigate(`/profile/${person.id}`)}
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className="font-bold text-lg text-gray-900 cursor-pointer hover:text-blue-600"
                            onClick={() => navigate(`/profile/${person.id}`)}
                          >
                            {person.name}
                          </h3>
                          {getRoleBadge(person.role)}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{person.title}</p>
                        <p className="text-sm text-gray-500 mb-2">{person.company}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {person.location}
                          </span>
                          <span>{person.mutualConnections} mutual connections</span>
                          <span>• {person.requestedAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <UserCheck className="w-4 h-4" />
                        Accept
                      </button>
                      <button className="px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center gap-2">
                        <UserX className="w-4 h-4" />
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Network;