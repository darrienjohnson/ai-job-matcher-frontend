'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function ResumeResultsPage() {
  const { id } = useParams(); // 👈 Gets resume ID from URL
  const [resume, setResume] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumeAndMatches = async () => {
      try {
        const resumeRes = await axios.get(`http://localhost:8080/api/resumes/${id}`);
        const matchRes = await axios.get(`http://localhost:8080/api/resumes/${id}/matches`);
        setResume(resumeRes.data);
        setMatches(matchRes.data);
      } catch (error) {
        console.error('Error fetching resume or matches:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeAndMatches();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!resume) return <p className="text-center mt-10 text-red-600">Resume not found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Resume Details</h1>

      <div className="space-y-2 text-gray-700">
        <p><strong>Name:</strong> {resume.candidateName}</p>
        <p><strong>Email:</strong> {resume.email}</p>
        <p><strong>Skills:</strong> {resume.skills}</p>
        <p><strong>Education:</strong> {resume.education}</p>
        <p><strong>Experience:</strong></p>
        <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded">{resume.experience}</pre>
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold text-gray-800">Matched Jobs</h2>
      {matches.length === 0 ? (
        <p>No matches found for this resume.</p>
      ) : (
        <ul className="space-y-4">
          {matches.map((job, idx) => (
            <li key={idx} className="border p-4 rounded bg-gray-50">
              <h3 className="font-bold">{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Match Score:</strong> {(job.matchScore * 100).toFixed(0)}%</p>
              <p className="text-sm text-gray-600 mt-2">{job.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
