// server/models/Transaction.js
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  // Associate the transaction with a user
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  // Associate the transaction with one of the user's accounts
  account: {
    type: mongoose.Schema.ObjectId,
    ref: 'Account',
    required: [true, 'Transaction must belong to an account'],
  },
  type: {
    type: String,
    required: true,
    enum: ['Income', 'Expense'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category (e.g., Salary, Groceries)'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Please add a positive amount'],
    validate: {
        validator: function (val) {
          return val > 0;
        },
        message: 'Amount must be positive'
    }
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionSchema);