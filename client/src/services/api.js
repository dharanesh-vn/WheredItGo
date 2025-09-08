// client/src/services/api.js
import axios from 'axios';

// Define the base URL for our backend API.
// Using a constant makes it easy to change if your server URL changes.
const API_URL = 'http://localhost:5000/api/';

// Create a customized instance of axios.
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Axios Interceptor: This is a powerful feature.
 * This code runs BEFORE every single request is sent by this `api` instance.
 * Its purpose is to get the `authToken` from localStorage and inject it into
 * the 'Authorization' header. This automates authentication for all protected endpoints.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // This part handles errors that might occur before a request is sent.
    return Promise.reject(error);
  }
);

// --- Define all our API functions, neatly organized by resource ---

// AUTH
export const login = (credentials) => api.post('users/login', credentials);
export const register = (userData) => api.post('users/register', userData);

// ACCOUNTS
export const getAccounts = () => api.get('accounts');
export const addAccount = (accountData) => api.post('accounts', accountData);

// TRANSACTIONS
export const getTransactions = () => api.get('transactions');
export const addTransaction = (transactionData) => api.post('transactions', transactionData);
export const deleteTransaction = (id) => api.delete(`transactions/${id}`);

// GOALS
export const getGoals = () => api.get('goals');
export const addGoal = (goalData) => api.post('goals', goalData);
export const deleteGoal = (id) => api.delete(`goals/${id}`);

// SUBSCRIPTIONS
export const getSubscriptions = () => api.get('subscriptions');
export const addSubscription = (subData) => api.post('subscriptions', subData);
export const deleteSubscription = (id) => api.delete(`subscriptions/${id}`);

// LOANS
export const getLoans = () => api.get('loans');
export const addLoan = (loanData) => api.post('loans', loanData);
export const updateLoan = (id, loanData) => api.put(`loans/${id}`, loanData);
export const deleteLoan = (id) => api.delete(`loans/${id}`);

// INVESTMENTS
export const getHoldings = () => api.get('investments');
export const addHolding = (holdingData) => api.post('investments', holdingData);
export const deleteHolding = (id) => api.delete(`investments/${id}`);

export default api;