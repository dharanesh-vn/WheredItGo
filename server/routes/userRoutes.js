// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Import controller functions
const {
  registerUser,
  loginUser,
} = require('../controllers/userController');

// Map routes to controller functions
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;