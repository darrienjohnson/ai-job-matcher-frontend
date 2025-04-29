'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      {/* Top Navigation Bar */}
      <Header />

      {/* Main Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-sky-100 pt-24 px-4">
        <div className="max-w-2xl w-full text-center space-y-6">

          {/* Catchy Main Tagline */}
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            The smartest way to find your next job.
          </h1>

          {/* Big Emotional Subheadline */}
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            Your success story begins with Resumend.
          </h2>

          {/* Short Description Paragraph */}
          <p className="text-gray-600 text-md mt-2">
            Upload your resume, and let our AI match you to top opportunities tailored to your skills. 
            Find your perfect role faster, smarter, and easier.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="space-y-4 pt-6">
            {/* Upload Resume Button */}
            <button
              onClick={() => router.push('/resume/upload')}
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Upload Your Resume
            </button>

            {/* Browse Jobs Button */}
            <button
              onClick={() => alert('Coming soon!')}
              className="w-full py-3 px-6 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Browse Jobs
            </button>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-20 max-w-4xl w-full text-center space-y-12">
          <h2 className="text-3xl font-bold text-gray-800">How Resumend Works</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 text-left">
            {/* Step 1 */}
            <div className="bg-white shadow-md rounded-xl p-6 space-y-3 hover:shadow-lg transition">
              <h3 className="font-bold text-xl text-gray-800">Upload</h3>
              <p className="text-gray-600 text-sm">
                Upload your resume securely into Resumend.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white shadow-md rounded-xl p-6 space-y-3 hover:shadow-lg transition">
              <h3 className="font-bold text-xl text-gray-800">AI Matching</h3>
              <p className="text-gray-600 text-sm">
                Our AI analyzes your skills and matches you to the right jobs.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white shadow-md rounded-xl p-6 space-y-3 hover:shadow-lg transition">
              <h3 className="font-bold text-xl text-gray-800">Get Hired</h3>
              <p className="text-gray-600 text-sm">
                Apply faster, smarter — and land your next role.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
