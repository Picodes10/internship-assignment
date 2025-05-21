import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const auth = {
  register: (userData) => {
    console.log('Registering with data:', userData);
    return api.post('/auth/register', userData);
  },
  login: (credentials) => {
    console.log('Logging in with credentials:', credentials);
    return api.post('/auth/login', {
      email: credentials.email,
      password: credentials.password
    });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// User services
export const user = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.patch('/users/profile', data)
};

// Job services
export const jobs = {
  getAll: () => api.get('/jobs'),
  getOne: (id) => api.get(`/jobs/${id}`),
  create: (data) => api.post('/jobs', data),
  update: (id, data) => api.patch(`/jobs/${id}`, data),
  delete: (id) => api.delete(`/jobs/${id}`)
};

export default api;