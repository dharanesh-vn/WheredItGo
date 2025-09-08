// server/controllers/accountController.js
const Account = require('../models/Account');

/**
 * @desc    Get all accounts for the logged-in user
 * @route   GET /api/accounts
 * @access  Private
 */
exports.getAccounts = async (req, res, next) => {
  try {
    const accounts = await Account.find({ user: req.user.id }).sort({ createdAt: 'desc' });
    return res.status(200).json({ success: true, count: accounts.length, data: accounts });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

/**
 * @desc    Add a new account for the logged-in user
 * @route   POST /api/accounts
 * @access  Private
 */
exports.addAccount = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const account = await Account.create(req.body);
    return res.status(201).json({ success: true, data: account });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};