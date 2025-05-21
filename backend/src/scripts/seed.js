import sequelize from '../config/database.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // Create test user with minimal required fields
    console.log('Creating test user...');
    const testUser = await User.create({
      email: 'test@test.com',
      password: 'test123',
      firstName: 'Test',
      lastName: 'User'
    });
    console.log('Test user created:', testUser.toJSON());

    // Verify the user was created
    console.log('\nVerifying user creation...');
    const createdUser = await User.findOne({ 
      where: { email: 'test@test.com' },
      raw: false // Get the full model instance
    });
    
    if (!createdUser) {
      throw new Error('Test user was not created successfully');
    }

    // Verify password was hashed
    const isHashed = createdUser.password !== 'test123';
    console.log('Password is hashed:', isHashed);
    console.log('Stored password hash:', createdUser.password);

    // Test password comparison
    console.log('\nTesting password comparison...');
    const passwordMatch = await createdUser.comparePassword('test123');
    console.log('Password comparison test:', passwordMatch);

    // Log all users in database
    console.log('\nAll users in database:');
    const allUsers = await User.findAll({ raw: true });
    console.log(allUsers);

    console.log('\nTest user details:');
    console.log('Email:', createdUser.email);
    console.log('Password: test123');
    console.log('User ID:', createdUser.id);
    console.log('First Name:', createdUser.firstName);
    console.log('Last Name:', createdUser.lastName);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 