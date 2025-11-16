// frontend/src/services/api.js
import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

export function setToken(token){
  if (token) api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  else delete api.defaults.headers.common['Authorization'];
}

// If token exists in localStorage on page load, set header
const stored = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
if (stored) setToken(stored);

export default api;
