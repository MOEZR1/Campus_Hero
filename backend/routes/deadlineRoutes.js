const express = require('express');
const router = express.Router();
const { addDeadline, getDeadlines, markAsComplete, deleteDeadline } = require('../controller/deadlineController'); // Adjust the path as necessary
const { requireAuth } = require('../middleware/authMiddleware'); // Adjust the path as necessary

router.post('/add', requireAuth, addDeadline);
router.get('/user/:userId', requireAuth, getDeadlines);
router.put('/complete/:deadlineId', requireAuth, markAsComplete);
router.delete('/:deadlineId', requireAuth, deleteDeadline);

module.exports = router;
