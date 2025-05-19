import React, { useState } from 'react';

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetRecommendations = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ skills: ['JavaScript', 'React', 'Node.js'] }), // Replace with actual user skills
      });
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      alert('Error fetching recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Job Recommendations</h2>
      <button
        onClick={handleGetRecommendations}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        {loading ? 'Loading...' : 'Find My Matches'}
      </button>
      <div className="space-y-4">
        {recommendations.map(job => (
          <div key={job.id} className="border p-4 rounded">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-gray-600">Skills: {job.skills.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations; 