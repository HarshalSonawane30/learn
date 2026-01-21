import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { FaTrophy, FaClock, FaCheckCircle, FaTimesCircle, FaStar } from 'react-icons/fa';
import './SkillTest.css';

// Sample questions database - In production, fetch from backend
const skillQuestions = {
  'React': [
    {
      id: 1,
      question: 'What is React?',
      options: [
        'A JavaScript library for building user interfaces',
        'A CSS framework',
        'A database',
        'A backend framework'
      ],
      correct: 0
    },
    {
      id: 2,
      question: 'What is JSX?',
      options: [
        'A JavaScript extension syntax',
        'A CSS preprocessor',
        'A database query language',
        'A testing framework'
      ],
      correct: 0
    },
    {
      id: 3,
      question: 'What are React Hooks?',
      options: [
        'Functions that let you use state in functional components',
        'CSS animations',
        'Database connections',
        'API endpoints'
      ],
      correct: 0
    },
    {
      id: 4,
      question: 'What is useState used for?',
      options: [
        'Managing state in functional components',
        'Making API calls',
        'Styling components',
        'Routing'
      ],
      correct: 0
    },
    {
      id: 5,
      question: 'What is useEffect used for?',
      options: [
        'Performing side effects in components',
        'Managing state',
        'Creating components',
        'Defining routes'
      ],
      correct: 0
    }
  ],
  'Node.js': [
    {
      id: 1,
      question: 'What is Node.js?',
      options: [
        'A JavaScript runtime built on Chrome\'s V8 engine',
        'A frontend framework',
        'A database',
        'A CSS framework'
      ],
      correct: 0
    },
    {
      id: 2,
      question: 'What is npm?',
      options: [
        'Node Package Manager',
        'Node Programming Method',
        'Network Protocol Manager',
        'New Programming Model'
      ],
      correct: 0
    },
    {
      id: 3,
      question: 'What is Express.js?',
      options: [
        'A web application framework for Node.js',
        'A database',
        'A frontend library',
        'A testing tool'
      ],
      correct: 0
    },
    {
      id: 4,
      question: 'What is middleware in Express?',
      options: [
        'Functions that have access to request and response objects',
        'Database queries',
        'Frontend components',
        'CSS styles'
      ],
      correct: 0
    },
    {
      id: 5,
      question: 'What is package.json?',
      options: [
        'A file containing project metadata and dependencies',
        'A JavaScript file',
        'A CSS file',
        'A database schema'
      ],
      correct: 0
    }
  ],
  'Python': [
    {
      id: 1,
      question: 'What is Python?',
      options: [
        'A high-level programming language',
        'A database',
        'A web browser',
        'An operating system'
      ],
      correct: 0
    },
    {
      id: 2,
      question: 'What is a list in Python?',
      options: [
        'An ordered collection of items',
        'A function',
        'A module',
        'A class'
      ],
      correct: 0
    },
    {
      id: 3,
      question: 'What is pip?',
      options: [
        'Python package installer',
        'A data type',
        'A loop statement',
        'A function'
      ],
      correct: 0
    },
    {
      id: 4,
      question: 'What is a dictionary in Python?',
      options: [
        'A collection of key-value pairs',
        'A list',
        'A string',
        'A number'
      ],
      correct: 0
    },
    {
      id: 5,
      question: 'What is def used for?',
      options: [
        'Defining functions',
        'Declaring variables',
        'Importing modules',
        'Creating classes'
      ],
      correct: 0
    }
  ]
};

const SkillTest = () => {
  const { skillName } = useParams();
  const navigate = useNavigate();
  const { addVerifiedSkill, addNotification } = useAppContext();

  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const questions = skillQuestions[skillName] || [];
  const totalQuestions = questions.length;
  const passingScore = 60; // 60% to pass

  // Timer countdown
  useEffect(() => {
    if (testStarted && !testCompleted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !testCompleted) {
      handleSubmitTest();
    }
  }, [timeLeft, testStarted, testCompleted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleSelectAnswer = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correct) {
        correct++;
      }
    });
    const percentage = (correct / totalQuestions) * 100;
    return { correct, percentage };
  };

  const handleSubmitTest = () => {
    const { correct, percentage } = calculateScore();
    setScore(percentage);
    setTestCompleted(true);
    setShowResults(true);

    if (percentage >= passingScore) {
      addVerifiedSkill(skillName);
      addNotification({
        id: Date.now(),
        type: 'success',
        title: 'Skill Verified!',
        message: `Congratulations! You passed the ${skillName} test with ${percentage.toFixed(0)}%`,
        timestamp: new Date(),
        read: false
      });
    }
  };

  const handleRetakeTest = () => {
    setTestStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeLeft(300);
    setTestCompleted(false);
    setScore(0);
    setShowResults(false);
  };

  if (!questions.length) {
    return (
      <div className="skill-test-container">
        <div className="test-not-found">
          <FaTimesCircle size={64} color="#dc3545" />
          <h2>Test Not Available</h2>
          <p>Sorry, we don't have a test for {skillName} yet.</p>
          <button onClick={() => navigate(-1)} className="btn-back">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const passed = score >= passingScore;
    return (
      <div className="skill-test-container">
        <div className="test-results">
          <div className={`result-icon ${passed ? 'passed' : 'failed'}`}>
            {passed ? (
              <FaTrophy size={80} color="#ffd700" />
            ) : (
              <FaTimesCircle size={80} color="#dc3545" />
            )}
          </div>
          <h1>{passed ? 'Congratulations!' : 'Keep Trying!'}</h1>
          <p className="result-message">
            {passed
              ? `You've successfully verified your ${skillName} skills!`
              : `You need ${passingScore}% to pass. Don't give up!`}
          </p>
          
          <div className="score-display">
            <div className="score-circle">
              <span className="score-value">{score.toFixed(0)}%</span>
            </div>
            <p className="score-text">
              {calculateScore().correct} out of {totalQuestions} correct
            </p>
          </div>

          <div className="result-actions">
            <button onClick={() => navigate('/profile')} className="btn-primary">
              <FaCheckCircle /> View Profile
            </button>
            <button onClick={handleRetakeTest} className="btn-secondary">
              Retake Test
            </button>
          </div>

          {passed && (
            <div className="badge-earned">
              <FaStar color="#ffd700" />
              <span>Verification badge earned!</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="skill-test-container">
        <div className="test-intro">
          <div className="test-header">
            <h1>{skillName} Skill Verification Test</h1>
            <p>Test your knowledge and earn a verification badge</p>
          </div>

          <div className="test-info">
            <div className="info-card">
              <FaClock size={32} color="#007bff" />
              <h3>Duration</h3>
              <p>5 Minutes</p>
            </div>
            <div className="info-card">
              <FaTrophy size={32} color="#ffd700" />
              <h3>Questions</h3>
              <p>{totalQuestions} MCQs</p>
            </div>
            <div className="info-card">
              <FaCheckCircle size={32} color="#28a745" />
              <h3>Pass Score</h3>
              <p>{passingScore}%</p>
            </div>
          </div>

          <div className="test-instructions">
            <h3>Instructions:</h3>
            <ul>
              <li>You have 5 minutes to complete the test</li>
              <li>Each question has 4 options, only one is correct</li>
              <li>You need {passingScore}% to pass and earn verification badge</li>
              <li>You can navigate between questions using Previous/Next buttons</li>
              <li>Test will auto-submit when time runs out</li>
            </ul>
          </div>

          <button onClick={handleStartTest} className="btn-start-test">
            Start Test
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="skill-test-container">
      <div className="test-header-bar">
        <div className="test-progress">
          <span>Question {currentQuestion + 1} of {totalQuestions}</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        <div className="test-timer">
          <FaClock />
          <span className={timeLeft < 60 ? 'time-warning' : ''}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="test-content">
        <div className="question-card">
          <h2 className="question-text">{question.question}</h2>
          
          <div className="options-list">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedAnswers[question.id] === index ? 'selected' : ''
                }`}
                onClick={() => handleSelectAnswer(question.id, index)}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="test-navigation">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className="btn-nav"
          >
            Previous
          </button>
          
          {currentQuestion === totalQuestions - 1 ? (
            <button onClick={handleSubmitTest} className="btn-submit">
              Submit Test
            </button>
          ) : (
            <button onClick={handleNextQuestion} className="btn-nav">
              Next
            </button>
          )}
        </div>

        <div className="question-dots">
          {questions.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentQuestion ? 'active' : ''} ${
                selectedAnswers[questions[index].id] !== undefined ? 'answered' : ''
              }`}
              onClick={() => setCurrentQuestion(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillTest;
