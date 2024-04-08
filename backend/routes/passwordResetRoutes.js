// passwordResetRoutes.js
const express = require('express');
const router = express.Router();
const passwordResetController = require('../controller/passwordResetController'); // Make sure the path is correct

router.post('/forgotPasswordRequest', passwordResetController.forgotPassword);
router.put('/reset-password/:token', passwordResetController.resetPassword);

module.exports = router;
