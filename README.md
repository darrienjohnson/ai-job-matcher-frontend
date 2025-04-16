# 💻 ai-job-matcher-frontend

This is the **frontend application** for the AI Job Matcher platform, built with [Next.js](https://nextjs.org). It allows users to:

- 📄 Upload resumes
- 💼 Browse job listings
- 🤖 View AI-generated similarity scores between resumes and job descriptions

This frontend communicates with the `ai-job-matcher` backend via REST API.

---

## 🔗 Project Overview

The full AI-powered job matching system consists of three components:

| Component               | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| 🧠 [`ai-embed-matcher`](https://github.com/YOUR_USERNAME/ai-embed-matcher) | Python Flask microservice for computing text similarity using embeddings |
| 🔧 [`ai-job-matcher`](https://github.com/YOUR_USERNAME/ai-job-matcher)     | Java Spring Boot backend API + database management                      |
| 💻 ai-job-matcher-frontend                               | This Next.js frontend for user interaction                              |

👉 **[See Full Architecture Overview in ai-job-matcher](https://github.com/YOUR_USERNAME/ai-job-matcher)**

---

## 🚀 Getting Started

First, install dependencies and start the development server:

```bash
npm install
npm run dev
# or
yarn dev
