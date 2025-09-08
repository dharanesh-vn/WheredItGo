// server/models/Account.js
const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  // Associate the account with a user
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please add an account name (e.g., Personal Checking)'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'Please add an account type'],
    enum: [
      'Bank Account',
      'Credit Card',
      'Savings',
      'Investment',
      'Payment Platform',
      'Crypto',
      'Other'
    ],
  },
  balance: {
    type: Number,
    required: [true, 'Please add a current balance'],
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Account', AccountSchema);
