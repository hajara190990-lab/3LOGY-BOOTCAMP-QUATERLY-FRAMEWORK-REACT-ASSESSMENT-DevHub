import api from './api';

const getAll = async () => {
  try {
    const response = await api.get('/api/snippets');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch snippets' };
  }
};

const getById = async (id) => {
  try {
    const response = await api.get(`/api/snippets/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch snippet' };
  }
};

const create = async (data) => {
  try {
    const response = await api.post('/api/snippets', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to create snippet' };
  }
};

const update = async (id, data) => {
  try {
    const response = await api.put(`/api/snippets/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update snippet' };
  }
};

const remove = async (id) => {
  try {
    const response = await api.delete(`/api/snippets/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to delete snippet' };
  }
};

export default { getAll, getById, create, update, remove };