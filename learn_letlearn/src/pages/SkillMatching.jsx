import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import {
  FaSearch,
  FaStar,
  FaUserPlus,
  FaCheckCircle,
  FaFilter,
  FaTimes,
  FaHeart,
  FaGraduationCap,
  FaChalkboardTeacher
} from 'react-icons/fa';
import './SkillMatching.css';

const SkillMatching = () => {
  const navigate = useNavigate();
  const { user, addConnection, addNotification } = useAppContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, mentors, learners
  const [selectedSkill, setSelectedSkill] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Mock data - In production, fetch from backend
  const [suggestedUsers, setSuggestedUsers] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      role: 'Full Stack Developer',
      skillsOffered: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      skillsWanted: ['Python', 'Machine Learning'],
      verified: ['React', 'Node.js'],
      matchScore: 95,
      followers: 2847,
      type: 'mentor',
      bio: 'Passionate developer with 5+ years of experience'
    },
    {
      id: 2,
      name: 'Alex Kumar',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      role: 'AI Engineer',
      skillsOffered: ['Python', 'TensorFlow', 'Machine Learning', 'Data Science'],
      skillsWanted: ['React', 'Frontend Development'],
      verified: ['Python', 'Machine Learning'],
      matchScore: 88,
      followers: 1532,
      type: 'mentor',
      bio: 'AI enthusiast helping others learn ML'
    },
    {
      id: 3,
      name: 'Maria Garcia',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      role: 'UX Designer',
      skillsOffered: ['UI/UX Design', 'Figma', 'Adobe XD'],
      skillsWanted: ['Frontend Development', 'React'],
      verified: ['UI/UX Design'],
      matchScore: 82,
      followers: 3421,
      type: 'learner',
      bio: 'Design thinking advocate and mentor'
    },
    {
      id: 4,
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      role: 'Backend Engineer',
      skillsOffered: ['Java', 'Spring Boot', 'Microservices'],
      skillsWanted: ['Node.js', 'Docker', 'Kubernetes'],
      verified: ['Java'],
      matchScore: 79,
      followers: 892,
      type: 'learner',
      bio: 'Building scalable backend systems'
    },
    {
      id: 5,
      name: 'Emily Watson',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      role: 'Data Scientist',
      skillsOffered: ['Python', 'R', 'Data Analysis', 'SQL'],
      skillsWanted: ['Big Data', 'Spark'],
      verified: ['Python', 'Data Analysis'],
      matchScore: 85,
      followers: 2104,
      type: 'mentor',
      bio: 'Making data tell stories'
    },
    {
      id: 6,
      name: 'David Lee',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      role: 'Mobile Developer',
      skillsOffered: ['React Native', 'Flutter', 'iOS', 'Android'],
      skillsWanted: ['Backend Development'],
      verified: ['React Native', 'Flutter'],
      matchScore: 77,
      followers: 1678,
      type: 'mentor',
      bio: 'Cross-platform mobile expert'
    }
  ]);

  const [connectionRequests, setConnectionRequests] = useState(new Set());
  const [connectedUsers, setConnectedUsers] = useState(new Set());

  // Filter users based on search and filters
  const filteredUsers = suggestedUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.skillsOffered.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'mentors' && u.type === 'mentor') ||
      (filterType === 'learners' && u.type === 'learner');

    const matchesSkill =
      !selectedSkill ||
      u.skillsOffered.includes(selectedSkill);

    return matchesSearch && matchesFilter && matchesSkill;
  });

  // Get all unique skills for filter
  const allSkills = [
    ...new Set(suggestedUsers.flatMap((u) => u.skillsOffered))
  ].sort();

  const handleConnect = (userId, userName) => {
    if (connectedUsers.has(userId)) {
      return;
    }

    setConnectionRequests((prev) => new Set(prev).add(userId));

    // Simulate connection request
    setTimeout(() => {
      setConnectedUsers((prev) => new Set(prev).add(userId));
      setConnectionRequests((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });

      addNotification({
        id: Date.now(),
        type: 'success',
        title: 'Connection Request Sent',
        message: `Your connection request to ${userName} has been sent!`,
        timestamp: new Date(),
        read: false
      });
    }, 1500);
  };

  const calculateMatchPercentage = (userSkills) => {
    // This is a simplified match algorithm
    // In production, you'd use more sophisticated matching
    return Math.floor(Math.random() * 30) + 70;
  };

  return (
    <div className="skill-matching-container">
      <div className="matching-header">
        <h1>Find Your Perfect Match</h1>
        <p>Connect with mentors and learners based on skills</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by name, role, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <FaTimes
              className="clear-search"
              onClick={() => setSearchQuery('')}
            />
          )}
        </div>

        <button
          className="filter-button"
          onClick={() => setShowFilterModal(true)}
        >
          <FaFilter /> Filters
        </button>
      </div>

      {/* Quick Filter Chips */}
      <div className="filter-chips">
        <button
          className={`chip ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => setFilterType('all')}
        >
          All Users
        </button>
        <button
          className={`chip ${filterType === 'mentors' ? 'active' : ''}`}
          onClick={() => setFilterType('mentors')}
        >
          <FaChalkboardTeacher /> Mentors
        </button>
        <button
          className={`chip ${filterType === 'learners' ? 'active' : ''}`}
          onClick={() => setFilterType('learners')}
        >
          <FaGraduationCap /> Learners
        </button>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <span>
          Showing {filteredUsers.length} matches sorted by relevance
        </span>
      </div>

      {/* User Cards Grid */}
      <div className="users-grid">
        {filteredUsers.length === 0 ? (
          <div className="no-results">
            <FaSearch size={64} color="#ccc" />
            <h3>No matches found</h3>
            <p>Try adjusting your filters or search query</p>
          </div>
        ) : (
          filteredUsers.map((matchUser) => (
            <div key={matchUser.id} className="user-match-card">
              {/* Match Score Badge */}
              <div className="match-score-badge">
                <FaHeart className="heart-icon" />
                <span>{matchUser.matchScore}% Match</span>
              </div>

              {/* User Avatar */}
              <div
                className="user-avatar"
                onClick={() => navigate(`/user/${matchUser.id}`)}
              >
                <img src={matchUser.avatar} alt={matchUser.name} />
                <div className="online-indicator" />
              </div>

              {/* User Info */}
              <div className="user-info">
                <h3 onClick={() => navigate(`/user/${matchUser.id}`)}>
                  {matchUser.name}
                  {matchUser.verified.length > 0 && (
                    <FaCheckCircle className="verified-icon" />
                  )}
                </h3>
                <p className="user-role">{matchUser.role}</p>
                <p className="user-bio">{matchUser.bio}</p>

                {/* User Type Badge */}
                <span className={`type-badge ${matchUser.type}`}>
                  {matchUser.type === 'mentor' ? (
                    <>
                      <FaChalkboardTeacher /> Mentor
                    </>
                  ) : (
                    <>
                      <FaGraduationCap /> Learner
                    </>
                  )}
                </span>
              </div>

              {/* Skills Section */}
              <div className="skills-section">
                <div className="skills-group">
                  <h4>Can Teach:</h4>
                  <div className="skills-tags">
                    {matchUser.skillsOffered.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className={`skill-tag ${
                          matchUser.verified.includes(skill)
                            ? 'verified'
                            : ''
                        }`}
                      >
                        {skill}
                        {matchUser.verified.includes(skill) && (
                          <FaStar className="star-icon" />
                        )}
                      </span>
                    ))}
                    {matchUser.skillsOffered.length > 3 && (
                      <span className="skill-tag more">
                        +{matchUser.skillsOffered.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="skills-group">
                  <h4>Wants to Learn:</h4>
                  <div className="skills-tags">
                    {matchUser.skillsWanted.slice(0, 2).map((skill) => (
                      <span key={skill} className="skill-tag wanted">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="user-stats">
                <div className="stat">
                  <strong>{matchUser.followers.toLocaleString()}</strong>
                  <span>Followers</span>
                </div>
                <div className="stat">
                  <strong>{matchUser.verified.length}</strong>
                  <span>Verified Skills</span>
                </div>
              </div>

              {/* Actions */}
              <div className="card-actions">
                <button
                  className="btn-view-profile"
                  onClick={() => navigate(`/user/${matchUser.id}`)}
                >
                  View Profile
                </button>
                <button
                  className={`btn-connect ${
                    connectedUsers.has(matchUser.id) ? 'connected' : ''
                  } ${
                    connectionRequests.has(matchUser.id) ? 'pending' : ''
                  }`}
                  onClick={() => handleConnect(matchUser.id, matchUser.name)}
                  disabled={
                    connectedUsers.has(matchUser.id) ||
                    connectionRequests.has(matchUser.id)
                  }
                >
                  {connectedUsers.has(matchUser.id) ? (
                    <>
                      <FaCheckCircle /> Connected
                    </>
                  ) : connectionRequests.has(matchUser.id) ? (
                    'Pending...'
                  ) : (
                    <>
                      <FaUserPlus /> Connect
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="modal-overlay" onClick={() => setShowFilterModal(false)}>
          <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Filter Options</h3>
              <FaTimes onClick={() => setShowFilterModal(false)} />
            </div>

            <div className="modal-content">
              <div className="filter-section">
                <h4>User Type</h4>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="filterType"
                      checked={filterType === 'all'}
                      onChange={() => setFilterType('all')}
                    />
                    All Users
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="filterType"
                      checked={filterType === 'mentors'}
                      onChange={() => setFilterType('mentors')}
                    />
                    Mentors Only
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="filterType"
                      checked={filterType === 'learners'}
                      onChange={() => setFilterType('learners')}
                    />
                    Learners Only
                  </label>
                </div>
              </div>

              <div className="filter-section">
                <h4>Filter by Skill</h4>
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="skill-select"
                >
                  <option value="">All Skills</option>
                  {allSkills.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn-reset"
                onClick={() => {
                  setFilterType('all');
                  setSelectedSkill('');
                }}
              >
                Reset Filters
              </button>
              <button
                className="btn-apply"
                onClick={() => setShowFilterModal(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillMatching;
