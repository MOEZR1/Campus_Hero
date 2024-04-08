const express = require('express');
const router = express.Router();
const habitController = require('../controller/habitController');
const { requireAuth } = require('../middleware/authMiddleware');

router.post('/', requireAuth, habitController.createHabit);
router.get('/', requireAuth, habitController.getHabits);
router.delete('/:id', requireAuth, habitController.deleteHabit);
router.put('/:id/complete', requireAuth, habitController.completeHabit);
router.put('/:id', requireAuth, habitController.updateHabit);

module.exports = router;
