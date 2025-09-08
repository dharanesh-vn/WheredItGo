// server/routes/goalRoutes.js
const express = require('express');
const router = express.Router();
const { getGoals, addGoal, deleteGoal } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

// Protect all routes
router.use(protect);

router.route('/')
  .get(getGoals)
  .post(addGoal);

router.route('/:id')
  .delete(deleteGoal);

module.exports = router;