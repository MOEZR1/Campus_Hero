// models/User.js
const crypto = require('crypto');
const mongoose = require('mongoose');
const {Schema} = mongoose

const UserSchema = new Schema({
  username: {
     type: String, 
     required: true, 
     unique: true },
  email: { 
    type: String,
    required: true,
    unique: true },
  password: { 
    type: String,
    required: true },
  isAdmin: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

})

UserSchema.methods.getResetPasswordToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
  return resetToken;
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
