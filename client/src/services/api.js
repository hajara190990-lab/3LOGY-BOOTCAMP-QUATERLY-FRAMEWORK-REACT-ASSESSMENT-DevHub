import axios from 'axios';

const api = axios.create({
  // import.meta.env is how Vite accesses your .env.local variables
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor: "Injects" the token into headers before the request leaves
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;