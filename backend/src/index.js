import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import sequelize from './config/database.js';

// Models
import User from './models/User.js';
import Job from './models/Job.js';

// Routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import jobRoutes from './routes/jobs.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// API status route
app.get('/api', (req, res) => {
  res.json({ 
    status: 'API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      jobs: '/api/jobs'
    }
  });
});

// Database connection and sync
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully');
    console.log('Database connection established');
  })
  .catch((err) => {
    console.error('Database sync error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).json({ 
    message: 'Route not found',
    path: req.url,
    method: req.method
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('- GET  /');
  console.log('- GET  /api');
  console.log('- POST /api/auth/register');
  console.log('- POST /api/auth/login');
  console.log('- GET  /api/users/profile');
  console.log('- GET  /api/jobs');
}); 