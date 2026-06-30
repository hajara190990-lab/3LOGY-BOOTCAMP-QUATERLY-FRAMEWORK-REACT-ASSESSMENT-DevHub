import api from './api';

const login = async (email, password) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Login failed' };
  }
};

const register = async (userName, email, password) => {
  try {
    const response = await api.post('/api/auth/register', { userName, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Registration failed' };
  }
};

const logout = () => {
  localStorage.removeItem('token');
};

const getToken = () => {
  return localStorage.getItem('token');
};

const getProfile = async () => {
  try {
    const response = await api.get('/api/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch profile' };
  }
};

export default { login, register, logout, getToken, getProfile };