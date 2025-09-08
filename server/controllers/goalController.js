// server/controllers/goalController.js
const Goal = require('../models/Goal');

/**
 * @desc    Get all goals for the logged-in user
 * @route   GET /api/goals
 * @access  Private
 */
exports.getGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({ createdAt: 'desc' });
    res.status(200).json({ success: true, count: goals.length, data: goals });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

/**
 * @desc    Add a new goal
 * @route   POST /api/goals
 * @access  Private
 */
exports.addGoal = async (req, res, next) => {
  try {
    req.body.user = req.user.id; // Link goal to logged-in user
    const goal = await Goal.create(req.body);
    res.status(201).json({ success: true, data: goal });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

/**
 * @desc    Delete a goal
 * @route   DELETE /api/goals/:id
 * @access  Private
 */
exports.deleteGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ success: false, error: 'Goal not found' });
    }

    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    await goal.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};