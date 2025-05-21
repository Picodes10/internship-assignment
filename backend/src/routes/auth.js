import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName
    });

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Error creating user',
      error: error.message 
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    console.log('\n=== Login Attempt ===');
    console.log('Request body:', req.body);
    
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      console.log('Missing credentials:', { email: !!email, password: !!password });
      return res.status(400).json({ 
        message: 'Email and password are required',
        received: { 
          email: !!email, 
          password: !!password,
          body: req.body 
        }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({ 
        message: 'Invalid email format',
        received: email 
      });
    }

    // Find user
    console.log('\nSearching for user with email:', email);
    const user = await User.findOne({ 
      where: { email },
      raw: false // Get the full model instance
    });
    
    console.log('User found:', !!user);
    if (user) {
      console.log('User details:', {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        hasPassword: !!user.password
      });
    }

    if (!user) {
      console.log('No user found with email:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    try {
      console.log('\nComparing passwords...');
      console.log('Input password:', password);
      console.log('Stored password hash:', user.password);
      
      const isMatch = await user.comparePassword(password);
      console.log('Password match result:', isMatch);

      if (!isMatch) {
        console.log('Password does not match');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      console.log('\nLogin successful!');
      console.log('Generated token:', token);
      
      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
    } catch (passwordError) {
      console.error('Password comparison error:', passwordError);
      return res.status(500).json({ 
        message: 'Error comparing passwords',
        error: passwordError.message
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Error logging in',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Logout endpoint (client-side only, just return success)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

export default router; 