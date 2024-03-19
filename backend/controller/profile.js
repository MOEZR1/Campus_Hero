// profile.js (backend controller)
const User = require('../models/User'); // Adjust the path if your User model is elsewhere
const jwt = require('jsonwebtoken');

const getProfile = (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: 'Invalid token' });
      } else {
        User.findById(decodedToken.id)
          .then(user => {
            if (user) {
              res.json(user);
            } else {
              res.status(404).json({ error: 'User not found' });
            }
          })
          .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
          });
      }
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
};

module.exports = {
  getProfile
};
