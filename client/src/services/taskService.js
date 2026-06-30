import api from './api';

const getAll = async () => {
  try {
    const response = await api.get('/api/tasks');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch tasks' };
  }
};

const getById = async (id) => {
  try {
    const response = await api.get(`/api/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch task' };
  }
};

const create = async (data) => {
  try {
    const response = await api.post('/api/tasks', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to create task' };
  }
};

const update = async (id, data) => {
  try {
    const response = await api.put(`/api/tasks/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update task' };
  }
};

const remove = async (id) => {
  try {
    const response = await api.delete(`/api/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to delete task' };
  }
};

const updateStatus = async (id, status) => {
  try {
    const response = await api.patch(`/api/tasks/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update task status' };
  }
};

export default { getAll, getById, create, update, remove, updateStatus };