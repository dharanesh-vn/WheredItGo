// server/routes/loanRoutes.js
const express = require('express');
const router = express.Router();
const { getLoans, addLoan, updateLoan, deleteLoan } = require('../controllers/loanController');
const { protect } = require('../middleware/authMiddleware');

// Protect all routes
router.use(protect);

router.route('/')
  .get(getLoans)
  .post(addLoan);

router.route('/:id')
  .put(updateLoan)
  .delete(deleteLoan);

module.exports = router;