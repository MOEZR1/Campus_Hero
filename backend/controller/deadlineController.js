const Deadline = require('../models/Deadline'); // Make sure this path points to where your Deadline model is defined

// POST: Add a new deadline
exports.addDeadline = async (req, res) => {
  try {
    const { task, dueDate, user } = req.body;
    const deadline = new Deadline({ task, dueDate, user });
    await deadline.save();
    res.status(201).json(deadline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET: Retrieve all deadlines for a specific user
exports.getDeadlines = async (req, res) => {
  try {
    const { userId } = req.params;
    const deadlines = await Deadline.find({ user: userId });
    res.status(200).json(deadlines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT: Mark a deadline as complete
exports.markAsComplete = async (req, res) => {
  try {
    const { deadlineId } = req.params;
    const deadline = await Deadline.findByIdAndUpdate(deadlineId, { completed: true }, { new: true });
    if (!deadline) {
      return res.status(404).json({ message: 'Deadline not found' });
    }
    res.status(200).json(deadline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE: Delete a deadline
exports.deleteDeadline = async (req, res) => {
  try {
    const { deadlineId } = req.params;
    const deadline = await Deadline.findByIdAndDelete(deadlineId);
    if (!deadline) {
      return res.status(404).json({ message: 'Deadline not found' });
    }
    res.status(200).json({ message: 'Deadline deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
