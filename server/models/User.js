// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: [true, 'Please provide your full name'] },
  email: {
    type: String, required: [true, 'Please provide an email'], unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
  },
  password: {
    type: String, required: [true, 'Please provide a password'],
    minlength: 6,
    select: false, // ** IMPORTANT: Password will not be sent back in queries by default
  },
  dob: { type: Date, required: [true, 'Please provide your date of birth'] },
  gender: { type: String, required: [true, 'Please select a gender'], enum: ['female', 'male', 'other'] },
  industry: { type: String, required: [true, 'Please provide your industry'] },
  company: { type: String },
  role: { type: String, required: [true, 'Please provide your role'] },
}, {
  timestamps: true,
});

// Middleware hook: This runs automatically BEFORE a user document is saved (.create() or .save())
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  // Hash the password with a salt round of 12
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare entered password with the hashed password in the DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;