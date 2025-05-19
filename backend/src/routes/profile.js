const express = require('express');
const router = express.Router();

// Mock profile database
const profiles = {};

// Get profile endpoint
router.get('/', (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  const profile = profiles[username];
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }
  res.json(profile);
});

// Update profile endpoint
router.post('/', (req, res) => {
  const { username, name, location, experience, skills, jobType } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  profiles[username] = { name, location, experience, skills, jobType };
  res.json({ message: 'Profile updated successfully', profile: profiles[username] });
});

module.exports = router; 