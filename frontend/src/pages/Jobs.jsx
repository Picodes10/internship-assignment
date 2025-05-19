import React, { useState, useEffect } from 'react';

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        alert('Error fetching jobs');
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
      <div className="space-y-4">
        {jobs.map(job => (
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

export default Jobs; 