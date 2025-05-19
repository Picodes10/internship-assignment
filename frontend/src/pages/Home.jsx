import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Find Your Dream Job with AI
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl">
              Our AI-powered platform matches your skills and preferences with the perfect job opportunities.
            </p>
            <div className="mt-10">
              <Link
                to="/jobs"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100"
              >
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Choose AI Job Match?
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                AI-Powered Matching
              </h3>
              <p className="text-gray-600">
                Our advanced AI algorithm analyzes your profile and matches you with the most relevant job opportunities.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Personalized Recommendations
              </h3>
              <p className="text-gray-600">
                Get job recommendations tailored to your skills, experience, and preferences.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Easy Profile Management
              </h3>
              <p className="text-gray-600">
                Create and update your profile with ease to get better job matches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 