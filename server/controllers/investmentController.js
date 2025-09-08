// server/controllers/investmentController.js
const InvestmentHolding = require('../models/InvestmentHolding');

/**
 * @desc    Get all investment holdings for a user
 * @route   GET /api/investments
 */
exports.getHoldings = async (req, res) => {
  try {
    const holdings = await InvestmentHolding.find({ user: req.user.id }).sort({ createdAt: 'desc' });
    res.status(200).json({ success: true, count: holdings.length, data: holdings });
  } catch (err) { 
    res.status(500).json({ success: false, error: 'Server Error' }); 
  }
};

/**
 * @desc    Add a new investment holding
 * @route   POST /api/investments
 */
exports.addHolding = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const holding = await InvestmentHolding.create(req.body);
    res.status(201).json({ success: true, data: holding });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(v => v.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

/**
 * @desc    Delete an investment holding
 * @route   DELETE /api/investments/:id
 */
exports.deleteHolding = async (req, res) => {
  try {
    const holding = await InvestmentHolding.findById(req.params.id);
    if (!holding) { 
      return res.status(404).json({ success: false, error: 'Holding not found' }); 
    }
    if (holding.user.toString() !== req.user.id) { 
      return res.status(401).json({ success: false, error: 'Not Authorized' }); 
    }
    
    await holding.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) { 
    res.status(500).json({ success: false, error: 'Server Error' }); 
  }
};