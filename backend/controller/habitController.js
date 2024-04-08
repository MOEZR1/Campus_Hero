const Habit = require('../models/Habit');
const User = require('../models/User');

// Create a new habit
exports.createHabit = async (req, res) => {
  try {
    const { name, category, goal, frequency, startDate, endDate, notes } = req.body;
    // Verify the user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Create and save the new habit
    const newHabit = await Habit.create({
      name,
      category,
      goal,
      frequency,
      startDate,
      endDate,
      notes,
      user: req.user.id, // Associate the habit with the user
    });
    res.status(201).json(newHabit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the list of habits for a user
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a habit
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // Verify the habit belongs to the user
    });
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    res.json({ message: 'Habit deleted', habitId: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Complete a habit
exports.completeHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id, // Verify the habit belongs to the user
      },
      {
        completed: true,
      },
      { new: true }
    );
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    res.json({ message: 'Habit completed', habit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a habit
exports.updateHabit = async (req, res) => {
  // Extract habit details from request body
  // ...
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      // Updated habit details
      // ...
      { new: true }
    );
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
