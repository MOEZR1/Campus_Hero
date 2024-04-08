// backend/routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const Email = require('../models/Email'); // Adjust the path as needed
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

// Fetch all emails
router.get('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const emails = await Email.find({});
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching emails', error: error });
  }
});

module.exports = router;
