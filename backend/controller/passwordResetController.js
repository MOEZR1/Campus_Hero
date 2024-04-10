//backend/controller/passwordresrtcontroller
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import your user model
const crypto = require('crypto'); // Node.js module
const sendEmail = require('../config/nodemailer'); // A utility function you'll create to handle email sending

exports.forgotPassword = async (req, res) => {

  const { email } = req.body;
  
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User with given email doesn't exist." });
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetUrl = `https://campus-habit-hero.onrender.com/reset-password/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. If this was you, click the link below to proceed.  \n\n ${resetUrl}`;

    // Send email
    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset ',
        message,
      });

      res.status(200).json({ success: true, data: 'Email Sent' });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      res.status(500).json({ message: 'Email could not be sent' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error processing your request' });
  }
};

exports.resetPassword = async (req, res) => {
  // Get hashed token
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired password! Reset you password again' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // Set new hashed password and clear resetToken fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Password updated successfully',
      // You may want to automatically log the user in by sending them a token, or you may want them to log in manually.
    });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting password' });
  }
};

