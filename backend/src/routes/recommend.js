const express = require('express');
const router = express.Router();

// Mock job listings (same as in jobs.js)
const jobs = [
  { id: 1, title: 'Software Engineer', company: 'Tech Corp', location: 'San Francisco', skills: ['JavaScript', 'React', 'Node.js'] },
  { id: 2, title: 'Data Scientist', company: 'Data Inc', location: 'New York', skills: ['Python', 'Machine Learning', 'SQL'] },
  { id: 3, title: 'Product Manager', company: 'Product Co', location: 'Remote', skills: ['Agile', 'Product Strategy', 'Communication'] }
];

// Get recommendations endpoint
router.post('/', (req, res) => {
  const { skills } = req.body;
  if (!skills || !Array.isArray(skills)) {
    return res.status(400).json({ message: 'Skills array is required' });
  }
  // Mock AI recommendation logic: filter jobs by matching skills
  const recommendations = jobs.filter(job => 
    job.skills.some(skill => skills.includes(skill))
  ).slice(0, 3);
  res.json(recommendations);
});

module.exports = router; 