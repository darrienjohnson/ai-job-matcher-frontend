'use client';

// Import React hooks for managing component state and effects
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';


export default function MatchResultsPage() {
  // Get dynamic resume ID from the URL
  const { id } = useParams();

  // Initialize router to programmatically navigate between pages
  const router = useRouter();

  // Local state variables to store matches, loading status, error messages, and filters
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [minScore, setMinScore] = useState(0);

  useEffect(() => {
    // Fetch matched job listings when the page loads using the resume ID
    const fetchMatches = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/match?resumeId=${id}`);
        if (!res.ok) throw new Error('Failed to fetch matches');
        const data = await res.json();
        setMatches(data); // Store matched jobs in state
      } catch (err) {
        setError(err.message); // Store any errors
      } finally {
        setLoading(false); // Mark loading as complete
      }
    };

    fetchMatches();
  }, [id]);

  // Filter matches based on search term and minimum match score
  const filteredMatches = matches.filter(
    (job) =>
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      job.matchScore >= minScore
  );

  // Display loading indicator while matches are being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading your matches...</p>
      </div>
    );
  }

  // Display error message if fetching matches failed
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <>
    <Header /> {/* ✅ Sticky header across all pages */}
    <div className="bg-gradient-to-b from-white to-sky-50 min-h-screen py-12 px-6">
      {/* Page Heading */}
      <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
        Top Job Matches For You
      </h1>

      {/* Search Input and Minimum Score Filter Controls */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring"
        />
        <input
          type="number"
          placeholder="Min score"
          step="0.01"
          value={minScore}
          onChange={(e) => setMinScore(Number(e.target.value))}
          className="w-32 px-4 py-2 border rounded focus:outline-none focus:ring"
        />
      </div>

      {/* Grid of Matched Job Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {filteredMatches.length === 0 ? (
          // If no matches found
          <p className="text-center text-gray-500 col-span-2">No matches found. Try adjusting your filters.</p>
        ) : (
          filteredMatches.map((job, idx) => (
            <div
              key={idx}
              className="p-6 border rounded-2xl shadow-sm bg-white hover:shadow-md hover:scale-[1.01] transition"
            >
              {/* Job Title */}
              <h2 className="text-lg font-bold mb-1">{job.title}</h2>
              {/* Company and Location */}
              <p className="text-gray-500 text-sm mb-2">{job.company} • {job.location}</p>
              {/* Job Description Preview */}
              <p className="text-sm text-gray-700 mb-2">
                {job.description.slice(0, 120)}{job.description.length > 120 ? '...' : ''}
              </p>
              {/* Match Score Badge */}
              <div className="flex justify-end">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    job.matchScore >= 0.6
                      ? 'bg-green-100 text-green-800'
                      : job.matchScore >= 0.3
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {Math.round(job.matchScore * 100)}%
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Back to Home Button at Bottom */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
        >
          ← Back to Home
        </button>
      </div>
    </div>
    </>
  );
}
