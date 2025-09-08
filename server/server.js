// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// --- Local Imports ---
const connectDB = require('./config/db');

// --- Import Route Files ---
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const goalRoutes = require('./routes/goalRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const loanRoutes = require('./routes/loanRoutes');
const investmentRoutes = require('./routes/investmentRoutes');

// --- Load Environment Variables ---
dotenv.config({ path: './.env' });

// --- Connect to MongoDB Database ---
connectDB();

// --- Initialize Express App ---
const app = express();

// --- Core Middlewares ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use('/api/users', userRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/investments', investmentRoutes);

// --- Static Asset Configuration (for Production) ---
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'))
  );
} else {
  app.get('/api', (req, res) => {
    res.status(200).json({ message: "Welcome to the Where'dItGo? API" });
  });
}

// --- Port & Server Initialization ---
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `🚀 Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// --- Global Error Handling for Unhandled Promise Rejections ---
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  server.close(() => process.exit(1));
});