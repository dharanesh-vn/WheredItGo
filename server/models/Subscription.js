// server/models/Subscription.js
const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please add a subscription name (e.g., Netflix)'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Please add the fixed amount'],
    validate: {
      validator: (val) => val >= 0,
      message: 'Amount must be a non-negative number.'
    }
  },
  billingCycle: {
    type: String,
    required: true,
    enum: ['Monthly', 'Annually', 'Weekly'],
    default: 'Monthly',
  },
  nextDueDate: {
    type: Date,
    required: [true, 'Please provide the next due date'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);