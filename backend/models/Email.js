const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  subject: { type: String, required: true },
  text: { type: String, required: true },
  html: { type: String, required: true },
  receivedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Email', emailSchema);
