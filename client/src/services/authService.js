import api from './api';

const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  // response.data will contain { token, email, userName, id }
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const register = async (userName, email, password) => {
  const response = await api.post('/api/auth/register', { userName, email, password });
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const getToken = () => localStorage.getItem('token');

const getProfile = async () => {
  const response = await api.get('/api/profile');
  return response.data;
};

export default { login, register, logout, getToken, getProfile };