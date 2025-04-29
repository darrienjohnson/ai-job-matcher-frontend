'use client';

// Importing React hooks and router
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';

import axios from 'axios';

// Importing confetti animation
import confetti from 'canvas-confetti';

export default function UploadSuccessPage() {
  const { id } = useParams(); // Extract resume ID from URL
  const router = useRouter(); // For page navigation

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFindingMatches, setIsFindingMatches] = useState(false); // State for "Finding Matches" button

  // Fetch resume details when page loads
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/resumes/${id}`);
        setResume(res.data);

        // 🎉 Trigger confetti once resume is successfully fetched
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (error) {
        console.error('Error fetching resume:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  // Redirect to matches page with a small delay
  const handleFindMatches = () => {
    setIsFindingMatches(true);
    setTimeout(() => {
      router.push(`/resume/${id}/matches`);
    }, 2000); // 2 second suspense delay
  };

  // Show loading spinner while fetching resume
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-sky-100">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading your resume...
        </div>
      </div>
    );
  }

  // If no resume found
  if (!resume) {
    return (
      <div className="text-center text-red-600 mt-20 text-lg">
        ❌ Resume not found.
      </div>
    );
  }

  // Main Success Content
  return (
    <>
    <Header /> {/* ✅ Consistent navbar */}
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-sky-100 px-4 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full space-y-8 text-center">

        {/* ✅ Success Banner */}
        <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-lg shadow-sm text-lg font-semibold">
          🎉 Resume uploaded successfully!
        </div>

        {/* ✅ Resume Mini Preview */}
        <div className="space-y-3 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-800">Resume Summary</h2>
          <p><strong>Name:</strong> {resume.candidateName}</p>
          <p><strong>Email:</strong> {resume.email}</p>
          <p><strong>Skills:</strong> {resume.skills ? resume.skills.slice(0, 100) + (resume.skills.length > 100 ? '...' : '') : 'N/A'}</p>
        </div>

        {/* 🚀 Find My Matches Button */}
        <button
          onClick={handleFindMatches}
          disabled={isFindingMatches}
          className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
        >
          {isFindingMatches ? '🎯 Finding your matches...' : '🚀 See My Matches'}
        </button>

        {/* 📝 Small Helper Note */}
        <p className="text-sm text-gray-500">
          Matching you with top jobs based on your skills.
        </p>
      </div>
    </div>
    </>
  );
}
