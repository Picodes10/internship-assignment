# AI-Powered Job Match Platform

A mini platform where users can sign up, create profiles, view job listings, and get AI-powered job recommendations.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (mock data for now)

## Setup

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Features

- **Authentication**: Sign up, login, logout
- **User Profile**: Create/update profile with skills, experience, location, and job type
- **Job Listings**: View a list of job openings
- **AI Recommendations**: Get top 3 job matches based on user profile

## API Endpoints

- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user
- `GET /api/profile` — Get user profile
- `POST /api/profile` — Create/update profile
- `GET /api/jobs` — List jobs
- `POST /api/recommend` — Get job recommendations 