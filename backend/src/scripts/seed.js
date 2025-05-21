import sequelize from '../config/database.js';
import User from '../models/User.js';
import Job from '../models/Job.js';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // Create test user
    console.log('Creating test user...');
    const testUser = await User.create({
      email: 'test@test.com',
      password: 'test123',
      firstName: 'Test',
      lastName: 'User'
    });
    console.log('Test user created:', testUser.toJSON());

    // Create test jobs
    console.log('\nCreating test jobs...');
    const jobs = [
      {
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        description: 'We are looking for a Senior Software Engineer to join our team. The ideal candidate will have experience with modern web technologies and a passion for building scalable applications.',
        requirements: [
          '5+ years of software development experience',
          'Strong knowledge of Node.js and Express',
          'Experience with React and modern frontend frameworks',
          'Proficiency in PostgreSQL and database design',
          'Experience with cloud platforms (AWS/GCP)'
        ],
        skills: ['Node.js', 'Express', 'React', 'PostgreSQL', 'AWS', 'TypeScript'],
        salary: { min: 120000, max: 180000, currency: 'USD' },
        type: 'Full-time',
        postedById: testUser.id
      },
      {
        title: 'Frontend Developer',
        company: 'Web Solutions',
        location: 'Remote',
        description: 'Join our team as a Frontend Developer and help us build beautiful, responsive web applications. We value clean code and user experience.',
        requirements: [
          '3+ years of frontend development experience',
          'Strong knowledge of React and modern JavaScript',
          'Experience with TypeScript',
          'Proficiency in CSS and responsive design',
          'Understanding of web performance optimization'
        ],
        skills: ['React', 'TypeScript', 'CSS', 'JavaScript', 'Redux', 'Tailwind CSS'],
        salary: { min: 90000, max: 120000, currency: 'USD' },
        type: 'Full-time',
        postedById: testUser.id
      },
      {
        title: 'Backend Developer Intern',
        company: 'StartupX',
        location: 'New York, NY',
        description: 'Great opportunity for a Backend Developer Intern to learn and grow in a fast-paced startup environment. You will work closely with our senior developers.',
        requirements: [
          'Currently pursuing a degree in Computer Science or related field',
          'Basic knowledge of Node.js and Express',
          'Understanding of database concepts',
          'Familiarity with Git and version control',
          'Strong problem-solving skills'
        ],
        skills: ['Node.js', 'Express', 'PostgreSQL', 'Git', 'JavaScript'],
        salary: { min: 25, max: 35, currency: 'USD' },
        type: 'Internship',
        postedById: testUser.id
      }
    ];

    for (const jobData of jobs) {
      const job = await Job.create(jobData);
      console.log('Created job:', job.title);
    }

    // Verify the jobs were created
    console.log('\nVerifying job creation...');
    const allJobs = await Job.findAll({
      include: [{
        model: User,
        as: 'postedBy',
        attributes: ['firstName', 'lastName', 'email']
      }]
    });
    
    console.log('\nAll jobs in database:');
    console.log(JSON.stringify(allJobs, null, 2));

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 