// backend/routes/adminRoutes.js
const express = require('express');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');
const adminController = require('../controller/adminController');

const router = express.Router();

router.get('/users', [requireAuth, requireAdmin], adminController.listUsers);
router.delete('/users/:id', [requireAuth, requireAdmin], adminController.deleteUser);

module.exports = router;

