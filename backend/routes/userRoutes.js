//routes/ useroutes
const express = require("express");
const router = express.Router();
const { test, registerUser, loginUser, getProfile} = require('../controller/authController');

// Define routes
router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.post('/logout', (req, res) => {
  res.clearCookie('token'); // Clear token cookie
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
