const express = require('express');
const router = express.Router();

// Mock job listings
const jobs = [
  { id: 1, title: 'Software Engineer', company: 'Tech Corp', location: 'San Francisco', skills: ['JavaScript', 'React', 'Node.js'] },
  { id: 2, title: 'Data Scientist', company: 'Data Inc', location: 'New York', skills: ['Python', 'Machine Learning', 'SQL'] },
  { id: 3, title: 'Product Manager', company: 'Product Co', location: 'Remote', skills: ['Agile', 'Product Strategy', 'Communication'] }
];

// Get jobs endpoint
router.get('/', (req, res) => {
  res.json(jobs);
});

module.exports = router; 