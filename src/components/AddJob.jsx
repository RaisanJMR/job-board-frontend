import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';

const AddJob = () => {
  const navigate = useNavigate();
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    type: 'Full-time',
    location: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        return value.trim().length < 2 ? 'Job title must be at least 2 characters long' : '';
      case 'company':
        return value.trim().length < 2 ? 'Company name must be at least 2 characters long' : '';
      case 'location':
        return value.trim().length < 2 ? 'Location must be at least 2 characters long' : '';
      case 'description':
        return value.trim().length < 10 ? 'Description must be at least 10 characters long' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (name, value) => {
    setNewJob({ ...newJob, [name]: value });

    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(newJob).forEach((key) => {
      if (key !== 'type') {
        const error = validateField(key, newJob[key]);
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    setTouched({
      title: true,
      company: true,
      location: true,
      description: true
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/job`, newJob);
      navigate('/');
    } catch (error) {
      console.error('Failed to add job:', error.response?.data || error.message);
      alert('Error adding job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-with-back">
          <Link to="/" className="back-button">
            <FiArrowLeft /> Back to Jobs
          </Link>
          <h1>Add New Job</h1>
        </div>
      </header>

      <div className="add-job-form">
        <div className="form-card">
          <div className="job-form">
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                value={newJob.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                onBlur={() => handleBlur('title')}
                className={errors.title && touched.title ? 'error' : ''}
              />
              {errors.title && touched.title && (
                <span className="error-message">{errors.title}</span>
              )}
            </div>

            <div className="form-group">
              <label>Company *</label>
              <input
                type="text"
                value={newJob.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                onBlur={() => handleBlur('company')}
                className={errors.company && touched.company ? 'error' : ''}
              />
              {errors.company && touched.company && (
                <span className="error-message">{errors.company}</span>
              )}
            </div>

            <div className="form-group">
              <label>Job Type</label>
              <select
                value={newJob.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
              >
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                value={newJob.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                onBlur={() => handleBlur('location')}
                className={errors.location && touched.location ? 'error' : ''}
              />
              {errors.location && touched.location && (
                <span className="error-message">{errors.location}</span>
              )}
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={newJob.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                onBlur={() => handleBlur('description')}
                rows="6"
                className={errors.description && touched.description ? 'error' : ''}
              />
              {errors.description && touched.description && (
                <span className="error-message">{errors.description}</span>
              )}
            </div>

            <div className="form-actions">
              <Link to="/" className="cancel-button">
                Cancel
              </Link>
              <button
                type="button"
                onClick={handleSubmit}
                className="submit-button"
                disabled={loading || Object.values(errors).some(e => e) || !newJob.title || !newJob.company || !newJob.location || !newJob.description}
              >
                {loading ? 'Adding...' : 'Add Job'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
