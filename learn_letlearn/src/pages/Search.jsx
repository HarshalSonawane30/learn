import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Filter, GraduationCap, BookOpen, Users, Star, MapPin } from 'lucide-react';
import Navbar from '../components/common/Navbar';

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all'); // 'all', 'teacher', 'learner', 'both'
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const mockResults = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'teacher',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      skills: ['React', 'JavaScript', 'Node.js'],
      rating: 4.8,
      studentsCount: 156,
      location: 'San Francisco, CA',
      matchScore: 95
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'both',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      skills: ['Python', 'Machine Learning', 'Data Science'],
      rating: 4.9,
      studentsCount: 234,
      location: 'New York, NY',
      matchScore: 88
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'teacher',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      skills: ['UI/UX Design', 'Figma', 'Adobe XD'],
      rating: 4.7,
      studentsCount: 89,
      location: 'Austin, TX',
      matchScore: 82
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'learner',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      skills: ['Web Development', 'JavaScript'],
      rating: 0,
      studentsCount: 0,
      location: 'Seattle, WA',
      matchScore: 75
    }
  ];

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      let filtered = mockResults;
      
      if (roleFilter !== 'all') {
        filtered = filtered.filter(user => user.role === roleFilter);
      }
      
      if (searchQuery) {
        filtered = filtered.filter(user =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      setResults(filtered);
      setLoading(false);
    }, 500);
  };

  const getRoleBadge = (role) => {
    const badges = {
      teacher: { icon: GraduationCap, class: 'badge-teacher', text: 'Teacher' },
      learner: { icon: BookOpen, class: 'badge-learner', text: 'Learner' },
      both: { icon: Users, class: 'badge-both', text: 'Teacher & Learner' }
    };
    const badge = badges[role] || badges.learner;
    const Icon = badge.icon;
    return (
      <span className={`badge ${badge.class} flex items-center gap-1`}>
        <Icon className="w-4 h-4" />
        {badge.text}
      </span>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pb-20 pt-16">
        <div className="max-w-2xl mx-auto p-4">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search by name or skills..."
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Filter by Role:</span>
          </div>
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'All' },
              { value: 'teacher', label: 'Teachers' },
              { value: 'learner', label: 'Learners' },
              { value: 'both', label: 'Both' }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => {
                  setRoleFilter(filter.value);
                  if (results.length > 0) handleSearch();
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  roleFilter === filter.value
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-primary'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full btn-primary mb-6"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="spinner w-12 h-12"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">
              {results.length} Results Found
            </h2>
            {results.map((user) => (
              <div key={user.id} className="card">
                <div className="flex items-start gap-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full cursor-pointer"
                    onClick={() => navigate(`/profile/${user.id}`)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3
                          className="font-semibold text-gray-900 cursor-pointer hover:text-primary"
                          onClick={() => navigate(`/profile/${user.id}`)}
                        >
                          {user.name}
                        </h3>
                        {getRoleBadge(user.role)}
                      </div>
                      {user.matchScore && (
                        <span className="text-xs font-medium text-primary bg-primary bg-opacity-10 px-2 py-1 rounded-full">
                          {user.matchScore}% Match
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      {user.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{user.rating}</span>
                        </div>
                      )}
                      {user.studentsCount > 0 && (
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{user.studentsCount} students</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{user.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {user.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/profile/${user.id}`)}
                        className="flex-1 btn-primary text-sm py-2"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => navigate(`/chat?user=${user.id}`)}
                        className="flex-1 btn-outline text-sm py-2"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery || roleFilter !== 'all' ? (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Start searching</h3>
            <p className="text-gray-600">Find teachers and learners based on skills and interests</p>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default Search;
