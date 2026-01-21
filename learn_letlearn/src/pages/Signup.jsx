import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaExclamationCircle, FaChalkboardTeacher, FaUserGraduate, FaBook, FaCheckCircle } from 'react-icons/fa';
import './Login.css'; // Reusing the same styles from Login

const Signup = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    role: 'learner', // 'learner' or 'teacher'
    teachingSkill: '',
    verificationAnswers: {}
  });
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
  const [errors, setErrors] = useState({});
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationPassed, setVerificationPassed] = useState(false);
  const nameInputRef = useRef(null);
  const location = useLocation();

  // Subject-specific verification questions
  const verificationQuestions = {
    'Web Development': [
      { id: 1, question: 'What does HTML stand for?', correctAnswer: 'hypertext markup language', options: ['Hypertext Markup Language', 'High Tech Modern Language', 'Hyperlink Text Management Language'] },
      { id: 2, question: 'Which CSS property controls text size?', correctAnswer: 'font-size', options: ['font-size', 'text-size', 'font-style'] },
      { id: 3, question: 'What is the correct syntax for referring to an external JavaScript file?', correctAnswer: '<script src="file.js">', options: ['<script src="file.js">', '<script href="file.js">', '<script name="file.js">'] }
    ],
    'Python Programming': [
      { id: 1, question: 'Which keyword is used to define a function in Python?', correctAnswer: 'def', options: ['def', 'function', 'func'] },
      { id: 2, question: 'What is the output of print(type([]))?', correctAnswer: '<class \'list\'>', options: ['<class \'list\'>', '<class \'array\'>', '<class \'tuple\'>'] },
      { id: 3, question: 'Which of these is NOT a Python data type?', correctAnswer: 'char', options: ['int', 'float', 'char'] }
    ],
    'Data Science': [
      { id: 1, question: 'Which library is commonly used for data manipulation in Python?', correctAnswer: 'pandas', options: ['pandas', 'numpy', 'matplotlib'] },
      { id: 2, question: 'What does ML stand for in data science?', correctAnswer: 'machine learning', options: ['Machine Learning', 'Multiple Layers', 'Model Logic'] },
      { id: 3, question: 'Which algorithm is used for classification?', correctAnswer: 'decision tree', options: ['Decision Tree', 'Linear Regression', 'K-Means'] }
    ],
    'Graphic Design': [
      { id: 1, question: 'What does RGB stand for?', correctAnswer: 'red green blue', options: ['Red Green Blue', 'Real Graphics Base', 'Render Grid Box'] },
      { id: 2, question: 'Which file format preserves transparency?', correctAnswer: 'png', options: ['PNG', 'JPG', 'BMP'] },
      { id: 3, question: 'What is the standard resolution for print design?', correctAnswer: '300 dpi', options: ['300 DPI', '72 DPI', '150 DPI'] }
    ],
    'Digital Marketing': [
      { id: 1, question: 'What does SEO stand for?', correctAnswer: 'search engine optimization', options: ['Search Engine Optimization', 'Social Engagement Online', 'System Enhancement Operation'] },
      { id: 2, question: 'Which platform is best for B2B marketing?', correctAnswer: 'linkedin', options: ['LinkedIn', 'Instagram', 'TikTok'] },
      { id: 3, question: 'What is CTR?', correctAnswer: 'click-through rate', options: ['Click-Through Rate', 'Customer Trust Rating', 'Content Transfer Rate'] }
    ]
  };

  useEffect(() => {
    if (location?.state?.fromNavbar && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [location]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    // Additional validation for teachers
    if (formData.role === 'teacher') {
      if (!formData.teachingSkill) newErrors.teachingSkill = 'Please select your teaching skill';
      if (!verificationPassed) newErrors.verification = 'Please complete the verification test';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerification = () => {
    if (!formData.teachingSkill) {
      setErrors({ teachingSkill: 'Please select a skill first' });
      return;
    }
    setVerificationStep(true);
  };

  const handleVerificationAnswer = (questionId, answer) => {
    setFormData(prev => ({
      ...prev,
      verificationAnswers: { ...prev.verificationAnswers, [questionId]: answer }
    }));
  };

  const submitVerification = () => {
    const questions = verificationQuestions[formData.teachingSkill];
    let correctCount = 0;
    
    questions.forEach(q => {
      const userAnswer = formData.verificationAnswers[q.id]?.toLowerCase().trim();
      if (userAnswer === q.correctAnswer.toLowerCase()) {
        correctCount++;
      }
    });
    
    // Need at least 2 out of 3 correct answers
    if (correctCount >= 2) {
      setVerificationPassed(true);
      setVerificationStep(false);
      setErrors({});
    } else {
      setErrors({ verification: `You got ${correctCount}/3 correct. You need at least 2 correct answers to verify your teaching credentials.` });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const payload = { 
      name: formData.name, 
      email: formData.email, 
      password: formData.password,
      role: formData.role,
      teachingSkill: formData.role === 'teacher' ? formData.teachingSkill : undefined,
      verified: formData.role === 'teacher' ? verificationPassed : true
    };
    
    fetch(`${API_URL}/api/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    })
      .then((res) => res.json().then((data) => ({ status: res.status, body: data })))
      .then(({ status, body }) => {
        if (status >= 400) {
          setErrors({ form: body?.message || 'Signup failed' });
          return;
        }
        navigate('/login', { state: { registered: true } });
      })
      .catch((err) => setErrors({ form: err.message || 'Network error' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    
    // Reset verification if teaching skill changes
    if (name === 'teachingSkill') {
      setVerificationPassed(false);
      setVerificationStep(false);
      setFormData(prev => ({ ...prev, verificationAnswers: {} }));
    }
    
    // Reset verification if role changes
    if (name === 'role' && value === 'learner') {
      setVerificationPassed(false);
      setVerificationStep(false);
      setFormData(prev => ({ ...prev, teachingSkill: '', verificationAnswers: {} }));
    }
  };

  const togglePasswordVisibility = (field) => setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="app-branding">
            <img
              src="/logo.png"
              alt="Logo"
              className="auth-logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/80x80?text=Logo';
              }}
            />
            <h1 className="app-name">Learn & Let Learn</h1>
            <p className="app-tagline">Connect • Share • Grow</p>
          </div>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join our learning community today</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {errors.form && <div className="form-error">{errors.form}</div>}

          <div className="form-group">
            <input
              ref={nameInputRef}
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              autoComplete="name"
            />
            <label className="form-label">
              <FaUser /> Full Name
            </label>
            {errors.name && (
              <div className="error-message">
                <FaExclamationCircle /> {errors.name}
              </div>
            )}
          </div>

          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              autoComplete="email"
            />
            <label className="form-label">
              <FaEnvelope /> Email Address
            </label>
            {errors.email && (
              <div className="error-message">
                <FaExclamationCircle /> {errors.email}
              </div>
            )}
          </div>

          {/* Role Selection */}
          <div className="form-group role-selection">
            <label className="role-label">I want to join as:</label>
            <div className="role-options">
              <div 
                className={`role-card ${formData.role === 'learner' ? 'active' : ''}`}
                onClick={() => handleChange({ target: { name: 'role', value: 'learner' } })}
              >
                <FaUserGraduate className="role-icon" />
                <div>
                  <h4>Learner</h4>
                  <p>Explore and learn new skills</p>
                </div>
              </div>
              <div 
                className={`role-card ${formData.role === 'teacher' ? 'active' : ''}`}
                onClick={() => handleChange({ target: { name: 'role', value: 'teacher' } })}
              >
                <FaChalkboardTeacher className="role-icon" />
                <div>
                  <h4>Teacher</h4>
                  <p>Share your expertise</p>
                </div>
              </div>
            </div>
          </div>

          {/* Teacher-specific fields */}
          {formData.role === 'teacher' && (
            <>
              <div className="form-group">
                <select
                  className="form-control"
                  name="teachingSkill"
                  value={formData.teachingSkill}
                  onChange={handleChange}
                >
                  <option value="">Select your teaching skill</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Python Programming">Python Programming</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                </select>
                <label className="form-label form-label-select">
                  <FaBook /> Teaching Skill
                </label>
                {errors.teachingSkill && (
                  <div className="error-message">
                    <FaExclamationCircle /> {errors.teachingSkill}
                  </div>
                )}
              </div>

              {formData.teachingSkill && !verificationPassed && !verificationStep && (
                <div className="verification-prompt">
                  <p>⚠️ To verify your teaching credentials, please complete a quick knowledge test.</p>
                  <button type="button" className="verify-btn" onClick={handleVerification}>
                    Start Verification Test
                  </button>
                </div>
              )}

              {verificationStep && (
                <div className="verification-section">
                  <h3>Verify Your Knowledge: {formData.teachingSkill}</h3>
                  <p className="verification-instruction">Answer at least 2 out of 3 questions correctly</p>
                  
                  {verificationQuestions[formData.teachingSkill].map((q, index) => (
                    <div key={q.id} className="verification-question">
                      <p className="question-text"><strong>Q{index + 1}.</strong> {q.question}</p>
                      <div className="question-options">
                        {q.options.map((option, idx) => (
                          <label key={idx} className="option-label">
                            <input
                              type="radio"
                              name={`question-${q.id}`}
                              value={option}
                              onChange={() => handleVerificationAnswer(q.id, option)}
                              checked={formData.verificationAnswers[q.id] === option}
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  {errors.verification && (
                    <div className="error-message">
                      <FaExclamationCircle /> {errors.verification}
                    </div>
                  )}

                  <div className="verification-actions">
                    <button type="button" className="verify-submit-btn" onClick={submitVerification}>
                      Submit Verification
                    </button>
                    <button type="button" className="verify-cancel-btn" onClick={() => setVerificationStep(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {verificationPassed && (
                <div className="verification-success">
                  <FaCheckCircle className="success-icon" />
                  <span>Verification Complete! You're verified to teach {formData.teachingSkill}</span>
                </div>
              )}
            </>
          )}

          <div className="form-group">
            <input
              type={showPassword.password ? 'text' : 'password'}
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              autoComplete="new-password"
            />
            <label className="form-label">
              <FaLock /> Password
            </label>
            <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('password')}>
              {showPassword.password ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <div className="error-message">
                <FaExclamationCircle /> {errors.password}
              </div>
            )}
          </div>

          <div className="form-group">
            <input
              type={showPassword.confirmPassword ? 'text' : 'password'}
              className="form-control"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder=" "
              autoComplete="new-password"
            />
            <label className="form-label">
              <FaLock /> Confirm Password
            </label>
            <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('confirmPassword')}>
              {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirmPassword && (
              <div className="error-message">
                <FaExclamationCircle /> {errors.confirmPassword}
              </div>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>

        <div className="auth-existing-account">
          <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;