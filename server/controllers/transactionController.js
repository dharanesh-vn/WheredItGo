// server/controllers/transactionController.js
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

// @desc    Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: 'desc' });
    res.status(200).json({ success: true, data: transactions });
  } catch (err) { res.status(500).json({ success: false, error: 'Server Error' }); }
};

// @desc    Add a new transaction
exports.addTransaction = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const account = await Account.findById(req.body.account);
    if (!account) return res.status(404).json({ success: false, error: 'Account not found' });
    if (account.user.toString() !== req.user.id) return res.status(401).json({ success: false, error: 'Not authorized for this account'});
    
    const transaction = await Transaction.create(req.body);
    const amount = req.body.type === 'Income' ? transaction.amount : -transaction.amount;
    account.balance += amount;
    await account.save();

    res.status(201).json({ success: true, data: transaction });
  } catch (err) {
    if (err.name === 'ValidationError') return res.status(400).json({ success: false, error: Object.values(err.errors).map(v => v.message) });
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ success: false, error: 'No transaction found' });
    if (transaction.user.toString() !== req.user.id) return res.status(401).json({ success: false, error: 'Not authorized' });

    const account = await Account.findById(transaction.account);
    if (account) {
        const amount = transaction.type === 'Income' ? -transaction.amount : transaction.amount;
        account.balance += amount;
        await account.save();
    }
    await transaction.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) { res.status(500).json({ success: false, error: 'Server Error' }); }
};