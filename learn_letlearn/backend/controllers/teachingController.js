import TimeSlot from '../models/TimeSlot.js';
import Session from '../models/Session.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';

// @desc    Create time slot (Teachers only)
// @route   POST /api/teaching/timeslots
// @access  Private (Teacher/Both)
export const createTimeSlot = async (req, res) => {
  try {
    if (req.user.role === 'learner') {
      return res.status(403).json({
        success: false,
        message: 'Only teachers can create time slots'
      });
    }

    const { date, startTime, endTime, duration, subject, notes } = req.body;

    const timeSlot = await TimeSlot.create({
      teacherId: req.user._id,
      date,
      startTime,
      endTime,
      duration,
      subject,
      notes
    });

    res.status(201).json({
      success: true,
      message: 'Time slot created successfully',
      timeSlot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get time slots for a teacher
// @route   GET /api/teaching/timeslots/:userId
// @access  Private
export const getTimeSlots = async (req, res) => {
  try {
    const { userId } = req.params;
    const { date, available } = req.query;

    let query = { teacherId: userId };

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    if (available === 'true') {
      query.isBooked = false;
    }

    const timeSlots = await TimeSlot.find(query)
      .populate('bookedBy', 'name avatar')
      .sort({ date: 1, startTime: 1 });

    res.status(200).json({
      success: true,
      count: timeSlots.length,
      timeSlots
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Book a time slot
// @route   POST /api/teaching/book
// @access  Private
export const bookTimeSlot = async (req, res) => {
  try {
    const { timeSlotId, subject, notes } = req.body;

    const timeSlot = await TimeSlot.findById(timeSlotId);

    if (!timeSlot) {
      return res.status(404).json({
        success: false,
        message: 'Time slot not found'
      });
    }

    if (timeSlot.isBooked) {
      return res.status(400).json({
        success: false,
        message: 'Time slot is already booked'
      });
    }

    if (timeSlot.teacherId.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot book your own time slot'
      });
    }

    // Update time slot
    timeSlot.isBooked = true;
    timeSlot.bookedBy = req.user._id;
    timeSlot.subject = subject || timeSlot.subject;
    timeSlot.notes = notes || timeSlot.notes;
    await timeSlot.save();

    // Create session
    const session = await Session.create({
      timeSlotId: timeSlot._id,
      teacherId: timeSlot.teacherId,
      learnerId: req.user._id,
      subject: timeSlot.subject,
      date: timeSlot.date,
      startTime: timeSlot.startTime,
      endTime: timeSlot.endTime,
      notes: timeSlot.notes
    });

    // Create notification for teacher
    const teacher = await User.findById(timeSlot.teacherId);
    const notification = await Notification.create({
      userId: teacher._id,
      type: 'session_booked',
      message: `${req.user.name} booked a session with you for ${timeSlot.subject}`,
      fromUser: req.user._id,
      link: `/sessions/${session._id}`
    });

    // Emit socket event
    if (global.io && teacher.socketId) {
      global.io.to(teacher.socketId).emit('notification', notification);
    }

    res.status(200).json({
      success: true,
      message: 'Time slot booked successfully',
      session
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get sessions for user
// @route   GET /api/teaching/sessions
// @access  Private
export const getSessions = async (req, res) => {
  try {
    const { status, role } = req.query;

    let query = {};

    if (role === 'teacher') {
      query.teacherId = req.user._id;
    } else if (role === 'learner') {
      query.learnerId = req.user._id;
    } else {
      query.$or = [
        { teacherId: req.user._id },
        { learnerId: req.user._id }
      ];
    }

    if (status) {
      query.status = status;
    }

    const sessions = await Session.find(query)
      .populate('teacherId', 'name avatar email')
      .populate('learnerId', 'name avatar email')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: sessions.length,
      sessions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update session status
// @route   PUT /api/teaching/sessions/:id/status
// @access  Private
export const updateSessionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    // Check authorization
    if (
      session.teacherId.toString() !== req.user._id.toString() &&
      session.learnerId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this session'
      });
    }

    session.status = status;
    await session.save();

    res.status(200).json({
      success: true,
      message: 'Session status updated',
      session
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Rate session
// @route   POST /api/teaching/sessions/:id/rate
// @access  Private
export const rateSession = async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    // Only learner can rate
    if (session.learnerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the learner can rate this session'
      });
    }

    if (session.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Can only rate completed sessions'
      });
    }

    session.rating = rating;
    session.feedback = feedback;
    await session.save();

    res.status(200).json({
      success: true,
      message: 'Session rated successfully',
      session
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
