// server/routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const { getAccounts, addAccount } = require('../controllers/accountController');

// Import the protect middleware
const { protect } = require('../middleware/authMiddleware');

// Any route in this file will first be validated by the 'protect' middleware
router.route('/')
  .get(protect, getAccounts)
  .post(protect, addAccount);

module.exports = router;