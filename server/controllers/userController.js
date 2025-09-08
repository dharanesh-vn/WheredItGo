// server/controllers/userController.js
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Helper function to create token and send successful response
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  const { fullName, email, password, dob, gender, industry, company, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    const user = await User.create({
      fullName, email, password, dob, gender, industry, company, role
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    // Handle validation errors from Mongoose
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    // Handle other server errors
    console.error(err); // Log the actual error on the server
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * @desc    Login a user
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide an email and password' });
  }

  try {
    // Crucially, we must use .select('+password') to retrieve the password field
    const user = await User.findOne({ email }).select('+password');

    // Check if user exists AND if the passwords match
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error(error); // Log the actual error on the server
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};