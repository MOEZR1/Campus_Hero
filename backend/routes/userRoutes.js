//routes/ useroutes
const express = require("express");
const router = express.Router();
const {  registerUser, loginUser, getProfile, updateProfile} = require('../controller/authController');
const { requireAuth } = require('../middleware/authMiddleware');

// Define routes

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', requireAuth, getProfile);
router.put('/profile', requireAuth, updateProfile); // Apply requireAuth middleware to protect the route
router.post('/logout', (req, res) => {
  res.clearCookie('token'); // Clear token cookie
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
