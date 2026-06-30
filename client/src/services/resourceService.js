import api from './api';

const getAll = async () => {
  try {
    const response = await api.get('/api/resources');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch resources' };
  }
};

const getById = async (id) => {
  try {
    const response = await api.get(`/api/resources/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch resource' };
  }
};

const create = async (data) => {
  try {
    const response = await api.post('/api/resources', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to create resource' };
  }
};

const update = async (id, data) => {
  try {
    const response = await api.put(`/api/resources/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update resource' };
  }
};

const remove = async (id) => {
  try {
    const response = await api.delete(`/api/resources/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to delete resource' };
  }
};

export default { getAll, getById, create, update, remove };