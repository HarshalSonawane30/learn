import SkillTest from '../models/SkillTest.js';
import SkillResult from '../models/SkillResult.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';

// @desc    Get skill test by skill name
// @route   GET /api/skills/tests/:skillName
// @access  Private
export const getSkillTest = async (req, res) => {
  try {
    const { skillName } = req.params;

    const test = await SkillTest.findOne({
      skillName: new RegExp(`^${skillName}$`, 'i'),
      isActive: true
    });

    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found for this skill'
      });
    }

    // Remove correct answers from response
    const sanitizedQuestions = test.questions.map(q => ({
      _id: q._id,
      question: q.question,
      options: q.options,
      difficulty: q.difficulty
    }));

    res.status(200).json({
      success: true,
      test: {
        _id: test._id,
        skillName: test.skillName,
        description: test.description,
        duration: test.duration,
        totalQuestions: test.totalQuestions,
        passingScore: test.passingScore,
        questions: sanitizedQuestions
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Submit skill test
// @route   POST /api/skills/submit
// @access  Private
export const submitSkillTest = async (req, res) => {
  try {
    const { testId, answers, timeTaken } = req.body;

    const test = await SkillTest.findById(testId);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      });
    }

    // Check if user already passed this test
    const existingResult = await SkillResult.findOne({
      userId: req.user._id,
      skillName: test.skillName,
      passed: true
    });

    if (existingResult) {
      return res.status(400).json({
        success: false,
        message: 'You have already passed this skill test'
      });
    }

    // Calculate score
    let correctAnswers = 0;
    const detailedAnswers = [];

    answers.forEach((answer, index) => {
      const question = test.questions[index];
      const isCorrect = answer === question.correctAnswer;
      
      if (isCorrect) correctAnswers++;

      detailedAnswers.push({
        questionId: question._id,
        selectedAnswer: answer,
        isCorrect
      });
    });

    const score = Math.round((correctAnswers / test.totalQuestions) * 100);
    const passed = score >= test.passingScore;

    // Save result
    const result = await SkillResult.create({
      userId: req.user._id,
      skillName: test.skillName,
      testId: test._id,
      score,
      correctAnswers,
      totalQuestions: test.totalQuestions,
      passed,
      answers: detailedAnswers,
      timeTaken
    });

    // If passed, add to verified skills
    if (passed) {
      const user = await User.findById(req.user._id);
      
      // Check if skill already verified
      const alreadyVerified = user.verifiedSkills.some(
        s => s.skill.toLowerCase() === test.skillName.toLowerCase()
      );

      if (!alreadyVerified) {
        user.verifiedSkills.push({
          skill: test.skillName,
          verifiedAt: new Date(),
          score
        });
        await user.save();

        // Create notification
        await Notification.create({
          userId: req.user._id,
          type: 'skill_verified',
          message: `Congratulations! You've been verified in ${test.skillName}`,
          link: '/profile'
        });
      }
    }

    res.status(200).json({
      success: true,
      message: passed ? 'Congratulations! You passed the test!' : 'Test submitted. Keep practicing!',
      result: {
        score,
        correctAnswers,
        totalQuestions: test.totalQuestions,
        passed,
        passingScore: test.passingScore
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's skill test results
// @route   GET /api/skills/results/:userId
// @access  Private
export const getUserResults = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check authorization
    if (userId !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view these results'
      });
    }

    const results = await SkillResult.find({ userId })
      .sort({ createdAt: -1 })
      .select('-answers'); // Don't send detailed answers

    res.status(200).json({
      success: true,
      count: results.length,
      results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all available skill tests
// @route   GET /api/skills/tests
// @access  Private
export const getAllTests = async (req, res) => {
  try {
    const tests = await SkillTest.find({ isActive: true })
      .select('skillName description duration totalQuestions passingScore');

    res.status(200).json({
      success: true,
      count: tests.length,
      tests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
