
import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const fetchJob = async (searchTerm = '') => {
    const response = await API.get('/api/job', {
        params: { search: searchTerm }
    });
    return response.data;
};

export const fetchSingleJob = async (jobId) => {
    const response = await API.get(`/api/job/${jobId}`);
    return response.data;
};

export const addJob = async (jobData) => {
    const response = await API.post('/api/job', jobData);
    return response.data;
};

export default API;
