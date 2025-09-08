// server/models/Goal.js
const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please add a goal name (e.g., MacBook Pro)'],
    trim: true,
  },
  targetAmount: {
    type: Number,
    required: [true, 'Please add a target amount'],
    validate: {
      validator: (val) => val > 0,
      message: 'Target amount must be a positive number.'
    }
  },
  savedAmount: {
    type: Number,
    default: 0,
  },
  // You can add other fields here later, like a targetDate
}, {
  timestamps: true,
});

module.exports = mongoose.model('Goal', GoalSchema);