// server/models/InvestmentHolding.js
const mongoose = require('mongoose');

const InvestmentHoldingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please add the name of the investment (e.g., Apple Inc.)'],
    trim: true,
  },
  symbol: {
    type: String,
    trim: true,
    uppercase: true,
    required: [true, 'Please add a stock symbol or ticker (e.g., AAPL)'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please add the quantity of shares/units owned'],
    validate: {
      validator: (val) => val > 0,
      message: 'Quantity must be a positive number.'
    }
  },
  purchasePrice: {
    type: Number,
    required: [true, 'Please add the average purchase price per share'],
  },
  sector: {
    type: String,
    trim: true,
    required: [true, 'Please add a sector (e.g., Information Technology)'],
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('InvestmentHolding', InvestmentHoldingSchema);