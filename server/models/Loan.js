// server/models/Loan.js
const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please add a name for the debt or loan'],
    trim: true,
  },
  totalAmount: {
    type: Number,
    required: [true, 'Please provide the total loan amount'],
    validate: {
      validator: (val) => val > 0,
      message: 'Total amount must be positive.'
    }
  },
  amountPaid: {
    type: Number,
    default: 0,
    validate: {
        validator: function(val) {
            // amountPaid cannot be greater than the totalAmount
            return val <= this.totalAmount;
        },
        message: 'Amount paid cannot exceed the total loan amount.'
    }
  },
  // Type field to distinguish between money owed vs money lent
  type: {
      type: String,
      required: true,
      enum: ['Debt', 'Loan'], // Debt = I owe, Loan = I am owed
      default: 'Debt',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Loan', LoanSchema);