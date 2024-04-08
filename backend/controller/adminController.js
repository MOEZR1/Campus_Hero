// backend/controllers/adminController.js
const User = require('../models/User');


exports.listUsers = async (req, res) => {
  try {
    // Assuming the user has been verified to be an admin by middleware
    const users = await User.find().select('_id username email');
    res.json(users);
  } catch (error) {
    console.error('Admin List Users Error:', error);
    res.status(500).json({ message: 'Failed to retrieve users.' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
