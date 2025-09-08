// server/controllers/loanController.js
const Loan = require('../models/Loan');

/**
 * @desc    Get all loans/debts for user
 * @route   GET /api/loans
 */
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: loans.length, data: loans });
  } catch (err) { 
    res.status(500).json({ success: false, error: 'Server Error' }); 
  }
};

/**
 * @desc    Add a new loan/debt
 * @route   POST /api/loans
 */
exports.addLoan = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const loan = await Loan.create(req.body);
    res.status(201).json({ success: true, data: loan });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

/**
 * @desc    Update a loan/debt (e.g., to add a payment)
 * @route   PUT /api/loans/:id
 */
exports.updateLoan = async (req, res) => {
    try {
        let loan = await Loan.findById(req.params.id);
        if (!loan) { 
          return res.status(404).json({ success: false, error: 'Loan not found' }); 
        }
        if (loan.user.toString() !== req.user.id) { 
          return res.status(401).json({ success: false, error: 'Not Authorized' }); 
        }
        
        loan = await Loan.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: loan });
    } catch(err) { 
      res.status(500).json({ success: false, error: 'Server Error' }); 
    }
};

/**
 * @desc    Delete a loan/debt
 * @route   DELETE /api/loans/:id
 */
exports.deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) { 
      return res.status(404).json({ success: false, error: 'Loan not found' }); 
    }
    if (loan.user.toString() !== req.user.id) { 
      return res.status(401).json({ success: false, error: 'Not Authorized' }); 
    }

    await loan.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) { 
    res.status(500).json({ success: false, error: 'Server Error' }); 
  }
};