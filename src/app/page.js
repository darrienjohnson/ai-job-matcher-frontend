'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">🎯 AI Job Matcher</h1>
        <p className="text-gray-600 text-lg">
          Upload your resume to instantly discover jobs that match your skills and experience.
        </p>

        <div className="space-y-4">
          {/* Upload Resume Button */}
          <button
            onClick={() => router.push('/resume/upload')}
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            🚀 Upload Your Resume
          </button>

          {/* Job Listings Placeholder */}
          <button
            onClick={() => alert('Coming soon!')}
            className="w-full py-3 px-6 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            🧭 Browse Job Listings
          </button>

          {/* Profile Placeholder */}
          <button
            onClick={() => alert('Profile feature coming soon!')}
            className="w-full py-3 px-6 bg-gray-100 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
            disabled
          >
            👤 Your Profile
          </button>
        </div>
      </div>
    </main>
  );
}
