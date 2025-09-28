import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const userAPI = {
  // Get all users with pagination and search
  getUsers: (page = 1, limit = 10, search = '') => {
    return api.get(`/users?page=${page}&limit=${limit}&search=${search}`);
  },

  // Get single user
  getUser: (id) => {
    return api.get(`/users/${id}`);
  },

  // Create user
  createUser: (userData) => {
    return api.post('/users', userData);
  },

  // Update user
  updateUser: (id, userData) => {
    return api.put(`/users/${id}`, userData);
  },

  // Delete user
  deleteUser: (id) => {
    return api.delete(`/users/${id}`);
  },

  // Export users to CSV
  exportUsers: () => {
    return api.get('/users/export/csv', {
      responseType: 'blob',
    });
  },
};

export default api;
