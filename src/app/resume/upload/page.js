'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ResumeUploadPage() {
    const router = useRouter();

    const [candidateName, setCandidateName] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [resumeUrl, setResumeUrl] = useState(null);
    const [parsedResume, setParsedResume] = useState(null);
    const [resumeId, setResumeId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !candidateName || !email) {
            setMessage('Please fill out all fields and upload a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('candidateName', candidateName);
        formData.append('email', email);

        try {
            const response = await axios.post(
                'http://localhost:8080/api/resumes/upload',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            setMessage('Please confirm your resume before proceeding.');
            setResumeUrl(response.data.fileUrl);
            setParsedResume(response.data.resume);
            setResumeId(response.data.resume.id);
        } catch (error) {
            console.error('Upload failed:', error.message);
            setMessage('Upload failed.');
        }
    };

    const handleConfirm = () => {
        router.push(`/resume/${resumeId}`);
    };

    const handleReject = () => {
        setCandidateName('');
        setEmail('');
        setFile(null);
        setMessage('');
        setResumeUrl(null);
        setParsedResume(null);
        setResumeId(null);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Upload Your Resume</h1>

            {/* Resume Upload Form */}
            {!parsedResume && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        className="w-full border p-2 rounded text-gray-800 placeholder-gray-500"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 rounded text-gray-800 placeholder-gray-500"
                    />

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full border p-2 rounded text-gray-800"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Upload Resume
                    </button>
                </form>
            )}

            {/* Status Message */}
            {message && (
                <p className="mt-4 text-center text-sm text-gray-700 font-medium">
                    {message}
                </p>
            )}

            {/* PDF Preview */}
            {resumeUrl && (
                <div>
                    <h2 className="text-lg font-semibold mt-6">Resume PDF Preview</h2>
                    <iframe
                        src={resumeUrl}
                        className="w-full h-96 border rounded"
                        title="Resume Preview"
                    />
                </div>
            )}

            {/* Inline Confirmation Preview */}
            {parsedResume && (
                <div className="mt-6 space-y-3">
                    {/* Confirm Buttons */}
                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            onClick={handleReject}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-800"
                        >
                            ❌ No, re-upload
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
                        >
                            ✅ Yes, looks correct
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
