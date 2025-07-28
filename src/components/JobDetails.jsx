import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiCalendar, FiUser, FiBriefcase } from 'react-icons/fi';
import { fetchSingleJob } from '../api/api';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const data = await fetchSingleJob(id);
        setJob(data);
      } catch (err) {
        console.error(err);
        setError('Job not found or an error occurred while fetching.');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return <div className="container"><p>Loading job details...</p></div>;
  }

  if (error || !job) {
    return (
      <div className="container">
        <div className="job-not-found">
          <h2>{error || 'Job not found'}</h2>
          <Link to="/" className="back-button">
            <FiArrowLeft /> Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <div className="header-with-back">
          <Link to="/" className="back-button">
            <FiArrowLeft /> Back to Jobs
          </Link>
          <h1>Job Details</h1>
        </div>
      </header>

      <div className="job-details">
        <div className="job-details-card">
          <div className="job-details-header">
            <div className="job-title-section">
              <h2 className="job-title">{job.title}</h2>
              <span className="job-type">{job.type}</span>
            </div>
          </div>

          <div className="job-company">
            <FiUser className="detail-icon" />
            <span>{job.company}</span>
          </div>

          <div className="job-details-meta">
            <div className="meta-item">
              <FiMapPin className="detail-icon" />
              <span>{job.location}</span>
            </div>
            <div className="meta-item">
              <FiCalendar className="detail-icon" />
              <span>Posted on {formatDate(job.createdAt)}</span>
            </div>
            <div className="meta-item">
              <FiBriefcase className="detail-icon" />
              <span>{job.type}</span>
            </div>
          </div>

          <div className="job-description-section">
            <h3>Job Description</h3>
            <p className="job-description-text">{job.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
