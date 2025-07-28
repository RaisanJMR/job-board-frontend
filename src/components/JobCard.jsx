import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiCalendar } from 'react-icons/fi';

const JobCard = ({ job }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Link to={`/job/${job._id}`} className="job-card-link">
      <div className="job-card">
        <div className="job-header">
          <h3 className="job-title">{job.title}</h3>
          <span className="job-type">{job.type}</span>
        </div>
        <p className="company">{job.company}</p>
        <div className="job-meta">
          <span className="location">
            <FiMapPin /> {job.location}
          </span>
          <span className="date">
            <FiCalendar /> {formatDate(job.createdAt)}
          </span>
        </div>
        <p className="description">{job.description}</p>
      </div>
    </Link>
  );
};

export default JobCard;