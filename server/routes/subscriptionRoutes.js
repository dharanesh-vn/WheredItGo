// server/routes/subscriptionRoutes.js
const express = require('express');
const router = express.Router();
const { getSubscriptions, addSubscription, deleteSubscription } = require('../controllers/subscriptionController');
const { protect } = require('../middleware/authMiddleware');

// Protect all routes
router.use(protect);

router.route('/')
  .get(getSubscriptions)
  .post(addSubscription);

router.route('/:id')
  .delete(deleteSubscription);

module.exports = router;