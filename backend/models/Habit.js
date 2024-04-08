const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: String,
  category: String,
  goal: String,
  frequency: String,
  startDate: Date,
  endDate: Date,
  notes: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Habit', habitSchema);
