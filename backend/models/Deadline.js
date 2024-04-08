// models/Deadline.js
const mongoose = require('mongoose');

const DeadlineSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Deadline', DeadlineSchema);
