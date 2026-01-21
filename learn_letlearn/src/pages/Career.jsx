import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Clock, Star, TrendingUp, Award, Search, Filter } from 'lucide-react';
import Navbar from '../components/common/Navbar';

const Career = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, remote, onsite, hybrid

  const jobs = [
    {
      id: 1,
      title: 'React Developer',
      company: 'Tech Corp',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=TC',
      location: 'Bangalore, India',
      type: 'Remote',
      salary: '₹12-18 LPA',
      posted: '2 days ago',
      applicants: 45,
      skills: ['React', 'JavaScript', 'Node.js'],
      description: 'Looking for experienced React developer to join our team...'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=SX',
      location: 'Mumbai, India',
      type: 'Hybrid',
      salary: '₹15-22 LPA',
      posted: '1 week ago',
      applicants: 89,
      skills: ['React', 'Node.js', 'MongoDB'],
      description: 'Join our exciting startup and build amazing products...'
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'Design Studio',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=DS',
      location: 'Pune, India',
      type: 'Onsite',
      salary: '₹10-15 LPA',
      posted: '3 days ago',
      applicants: 67,
      skills: ['Figma', 'Adobe XD', 'UI Design'],
      description: 'Create stunning user experiences for our clients...'
    },
    {
      id: 4,
      title: 'Data Scientist',
      company: 'AI Labs',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=AL',
      location: 'Hyderabad, India',
      type: 'Remote',
      salary: '₹18-25 LPA',
      posted: '5 days ago',
      applicants: 123,
      skills: ['Python', 'Machine Learning', 'TensorFlow'],
      description: 'Work on cutting-edge AI and ML projects...'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'Cloud Solutions',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=CS',
      location: 'Delhi, India',
      type: 'Hybrid',
      salary: '₹16-20 LPA',
      posted: '1 day ago',
      applicants: 34,
      skills: ['AWS', 'Docker', 'Kubernetes'],
      description: 'Manage and optimize our cloud infrastructure...'
    },
    {
      id: 6,
      title: 'Backend Developer',
      company: 'Enterprise Co',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=EC',
      location: 'Chennai, India',
      type: 'Onsite',
      salary: '₹14-19 LPA',
      posted: '4 days ago',
      applicants: 56,
      skills: ['Java', 'Spring Boot', 'MySQL'],
      description: 'Build robust backend systems for enterprise clients...'
    }
  ];

  const filteredJobs = filter === 'all' 
    ? jobs 
    : jobs.filter(job => job.type.toLowerCase() === filter);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pb-20 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white mb-6">
            <h1 className="text-3xl font-bold mb-2">Find Your Dream Career</h1>
            <p className="text-blue-100">Discover opportunities that match your skills and aspirations</p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jobs, companies, or skills..."
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Jobs
                </button>
                <button
                  onClick={() => setFilter('remote')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === 'remote' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Remote
                </button>
                <button
                  onClick={() => setFilter('hybrid')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === 'hybrid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Hybrid
                </button>
                <button
                  onClick={() => setFilter('onsite')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === 'onsite' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Onsite
                </button>
              </div>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all cursor-pointer"
                onClick={() => navigate(`/job/${job.id}`)}
              >
                <div className="p-6">
                  {/* Company Logo and Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-lg"
                    />
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.type === 'Remote' 
                        ? 'bg-green-100 text-green-700'
                        : job.type === 'Hybrid'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {job.type}
                    </span>
                  </div>

                  {/* Job Title */}
                  <h3 className="font-bold text-lg text-gray-900 mb-1 hover:text-blue-600">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{job.company}</p>

                  {/* Job Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{job.posted}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500">{job.applicants} applicants</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle apply
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Career Resources Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Resume Builder</h3>
              <p className="text-gray-600 text-sm mb-4">
                Create a professional resume that stands out
              </p>
              <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">
                Build Resume →
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Interview Prep</h3>
              <p className="text-gray-600 text-sm mb-4">
                Practice with common interview questions
              </p>
              <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">
                Start Practicing →
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Career Advice</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get expert guidance on your career path
              </p>
              <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">
                Read Articles →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Career;
