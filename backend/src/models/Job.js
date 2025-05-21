import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  requirements: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  skills: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  salary: {
    type: DataTypes.JSONB,
    defaultValue: {
      min: null,
      max: null,
      currency: 'USD'
    }
  },
  type: {
    type: DataTypes.ENUM('Full-time', 'Part-time', 'Contract', 'Internship'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'closed'),
    defaultValue: 'active'
  }
});

// Define associations
Job.belongsTo(User, { as: 'postedBy', foreignKey: 'postedById' });
User.hasMany(Job, { foreignKey: 'postedById' });

export default Job; 