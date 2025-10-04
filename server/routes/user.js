const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Activity = require('../models/Activity');
const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    res.json({ message: 'Signup successful', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    res.json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save Activity
router.post('/activity', async (req, res) => {
  try {
    const { userId, name, description } = req.body;
    if (!userId || !name || !description) return res.status(400).json({ message: 'Missing fields' });

    const activity = new Activity({ userId, name, description });
    await activity.save();
    res.json({ message: 'Activity saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
