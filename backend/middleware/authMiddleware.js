const jwt = require('jsonwebtoken');
const User = require('../models/User'); // adjust the path as needed

// Middleware to check if the user is authenticated
exports.requireAuth = (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Authorization token required' });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    } else {
      try {
        const user = await User.findById(decodedToken.id);
        if (!user) {
          return res.status(401).json({ error: 'User not found' });
        }
        req.user = { id: user._id, isAdmin: user.isAdmin }; // Changed from req.user.id
        next();
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  });
};

// Middleware to check if the user has admin privileges
exports.requireAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Admin privileges required' });
  }
};


// Export the middleware functions
module.exports = { 
  requireAuth: exports.requireAuth, 
  requireAdmin: exports.requireAdmin 
};
