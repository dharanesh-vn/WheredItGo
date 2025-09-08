// server/controllers/subscriptionController.js
const Subscription = require('../models/Subscription');

exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id }).sort({ nextDueDate: 'asc' });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (err) { res.status(500).json({ success: false, error: 'Server Error' }); }
};

exports.addSubscription = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const subscription = await Subscription.create(req.body);
    res.status(201).json({ success: true, data: subscription });
  } catch (err) {
    if (err.name === 'ValidationError') return res.status(400).json({ success: false, error: Object.values(err.errors).map(v => v.message) });
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const sub = await Subscription.findById(req.params.id);
    if (!sub || sub.user.toString() !== req.user.id) return res.status(401).json({ success: false, error: 'Not authorized' });
    await sub.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) { res.status(500).json({ success: false, error: 'Server Error' }); }
};