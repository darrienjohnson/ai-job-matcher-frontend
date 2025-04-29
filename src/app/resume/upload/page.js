'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';


export default function UploadPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!name || !email || !file) {
      setError('All fields are required.');
      return;
    }
    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('candidateName', name);
    formData.append('email', email);
    formData.append('file', file); // ✅ backend expects 'file'

    try {
      const res = await fetch('http://localhost:8080/api/resumes/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      router.push(`/resume/${data.resume.id}`); // Redirect to the resume page
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
    <Header /> {/*Show header at top */}
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 px-4">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          📄 Upload Your Resume
        </h1>
        <p className="text-center text-gray-600 mb-6">
          We'll match you with jobs based on your skills and experience.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
          />
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full file:border file:border-gray-300 file:px-3 file:py-2 file:rounded file:bg-white file:text-sm file:cursor-pointer text-gray-600"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : '🚀 Upload Resume'}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
// This is a simple upload page for the resume. It includes a form with fields for the user's name, email, and file upload.
// The form data is sent to the backend API for processing. The page also handles errors and shows a loading state while the upload is in progress.
// The page is styled using Tailwind CSS for a clean and modern look. The upload button is disabled while the file is being uploaded to prevent multiple submissions.
// The page uses the useRouter hook from Next.js to navigate to the matches page after a successful upload.