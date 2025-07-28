# Job Board Frontend

A simple, modern job listing web application built with **React** and **Vite**. Users can browse, search, view details, and post new job listings.

Live URL: [https://job-board-frontend-two.vercel.app](https://job-board-frontend-two.vercel.app)

Backend API: [https://job-board-backend-vy6y.onrender.com](https://job-board-backend-vy6y.onrender.com)

---

## Features

- ✅ View all job listings
- 🔍 Search by job title and location
- 📄 View detailed job descriptions
- 📝 Add new job postings with form validation
- 📱 Responsive design

---

## Tech Stack

- React (via Vite)
- React Router
- CSS 
- Axios for API requests

---

## 📁 Project Structure

```
frontend/
│
├── public/
├── src/
│ ├── components/
│ │ ├── JobCard.jsx
| | |── JobListing.jsx
| | |── AddJob.jsx
│ │ └── JobDetails.jsx
│ │── App.css
│ ├── App.jsx
│ ├── main.jsx
├── .env # Contains VITE_API_BASE_URL
├── package.json
└── vite.config.js
```

## installation

# Clone the repo
```
git clone https://github.com/your-username/job-board-frontend.git
cd job-board-frontend

# Install dependencies
npm install

# Create the .env file in root
"VITE_API_BASE_URL=https://job-board-backend-vy6y.onrender.com"

# Run the app
npm run dev
```
