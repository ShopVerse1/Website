const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Simple middleware that doesn't break anything
const protect = (req, res, next) => {
  // For now, just continue without authentication
  req.user = { id: 'demo-user' }; // Temporary demo user
  next();
};

const authorize = (...roles) => {
  return (req, res, next) => {
    // For now, allow all roles
    next();
  };
};

module.exports = {
  protect,
  authorize
};