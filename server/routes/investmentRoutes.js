// server/routes/investmentRoutes.js
const express = require('express');
const router = express.Router();
const { getHoldings, addHolding, deleteHolding } = require('../controllers/investmentController');
const { protect } = require('../middleware/authMiddleware');

// Protect all investment routes
router.use(protect);

router.route('/')
    .get(getHoldings)
    .post(addHolding);

router.route('/:id')
    .delete(deleteHolding);

module.exports = router;