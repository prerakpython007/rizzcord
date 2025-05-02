import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    maxContentLength: 50 * 1024 * 1024, // 50MB
    maxBodyLength: 50 * 1024 * 1024 // 50MB
});

axiosInstance.interceptors.request.use(
    config => {
        return config;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.message === 'Network Error') {
            console.error('CORS or Network error:', error);
        }
        return Promise.reject(error);
    }
);