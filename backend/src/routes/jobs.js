import express from 'express';
import { auth } from '../middleware/auth.js';
import Job from '../models/Job.js';
import User from '../models/User.js';

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all jobs...');
    const jobs = await Job.findAll({
      where: { status: 'active' },
      include: [{
        model: User,
        as: 'postedBy',
        attributes: ['firstName', 'lastName', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });
    console.log(`Found ${jobs.length} jobs`);
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ 
      message: 'Error fetching jobs',
      error: error.message 
    });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    console.log(`Fetching job with ID: ${req.params.id}`);
    const job = await Job.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'postedBy',
        attributes: ['firstName', 'lastName', 'email']
      }]
    });
    
    if (!job) {
      console.log('Job not found');
      return res.status(404).json({ message: 'Job not found' });
    }
    
    console.log('Job found:', job.title);
    res.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ 
      message: 'Error fetching job',
      error: error.message 
    });
  }
});

// Create job
router.post('/', auth, async (req, res) => {
  try {
    console.log('Creating new job:', req.body);
    const job = await Job.create({
      ...req.body,
      postedById: req.user.id
    });
    console.log('Job created successfully:', job.title);
    res.status(201).json(job);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(400).json({ 
      message: 'Error creating job',
      error: error.message 
    });
  }
});

// Update job
router.patch('/:id', auth, async (req, res) => {
  try {
    console.log(`Updating job with ID: ${req.params.id}`);
    const job = await Job.findOne({ 
      where: { 
        id: req.params.id,
        postedById: req.user.id 
      }
    });

    if (!job) {
      console.log('Job not found or unauthorized');
      return res.status(404).json({ message: 'Job not found' });
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'company', 'location', 'description', 'requirements', 'salary', 'type', 'status'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      console.log('Invalid update fields:', updates);
      return res.status(400).json({ message: 'Invalid updates' });
    }

    await job.update(req.body);
    console.log('Job updated successfully:', job.title);
    res.json(job);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(400).json({ 
      message: 'Error updating job',
      error: error.message 
    });
  }
});

// Delete job
router.delete('/:id', auth, async (req, res) => {
  try {
    console.log(`Deleting job with ID: ${req.params.id}`);
    const job = await Job.findOne({ 
      where: { 
        id: req.params.id,
        postedById: req.user.id 
      }
    });

    if (!job) {
      console.log('Job not found or unauthorized');
      return res.status(404).json({ message: 'Job not found' });
    }

    await job.destroy();
    console.log('Job deleted successfully');
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ 
      message: 'Error deleting job',
      error: error.message 
    });
  }
});

export default router; 