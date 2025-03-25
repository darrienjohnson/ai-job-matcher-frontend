'use client'; // Ensures this component runs in the browser (App Router requirement)

import { useState } from 'react';
import axios from 'axios';

export default function ResumeUploadPage() {
  // Set up local state to store form values and response messages
const [candidateName, setCandidateName] = useState('');
const [email, setEmail] = useState('');
const [file, setFile] = useState(null);
const [message, setMessage] = useState('');

  // Handles form submission
const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Validate fields before sending
    if (!file || !candidateName || !email) {
    setMessage('Please fill out all fields and upload a file.');
    return;
    }

    // Create form data to send to the backend
    const formData = new FormData();
    formData.append('file', file);
    formData.append('candidateName', candidateName);
    formData.append('email', email);

    try {
        await axios.post('http://localhost:8080/api/resumes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        });
    
        // Show success message after the upload completes
        setMessage('Resume uploaded successfully!');
    } catch (error) {
        console.error('Upload failed:', error.message); // Show error in console
        setMessage('Upload failed.');
    }
};

return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
    <h1 className="text-2xl font-bold mb-4">Upload Your Resume</h1>

      {/* Resume Upload Form */}
    <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <input
        type="text"
        placeholder="Name"
        value={candidateName}
        onChange={(e) => setCandidateName(e.target.value)}
        className="w-full border p-2 rounded"
        />

        {/* Email Field */}
        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
        />

        {/* File Upload Field */}
        <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full border p-2 rounded"
        />

        {/* Submit Button */}
        <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
        Upload Resume
        </button>
    </form>

      {/* Status Message */}
    {message && <p className="mt-4 text-center">{message}</p>}
    </div>
);
}
