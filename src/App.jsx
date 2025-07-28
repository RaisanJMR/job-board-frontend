import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const JobListing = lazy(() => import('./components/JobListing'));
const AddJob = lazy(() => import('./components/AddJob'));
const JobDetails = lazy(() => import('./components/JobDetails'));
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Suspense fallback={<h1 className='loader'>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<JobListing />} />
            <Route path="/add-job" element={<AddJob />} />
            <Route path="/job/:id" element={<JobDetails />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
