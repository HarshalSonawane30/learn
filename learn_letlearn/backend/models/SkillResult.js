import mongoose from 'mongoose';

const skillResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skillName: {
    type: String,
    required: true
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SkillTest',
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  passed: {
    type: Boolean,
    required: true
  },
  answers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    selectedAnswer: Number,
    isCorrect: Boolean
  }],
  timeTaken: {
    type: Number
  }
}, {
  timestamps: true
});

// Index for faster queries
skillResultSchema.index({ userId: 1, skillName: 1, createdAt: -1 });

const SkillResult = mongoose.model('SkillResult', skillResultSchema);

export default SkillResult;
