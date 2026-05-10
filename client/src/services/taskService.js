import api from './api';

const getAll = async () => {
  const response = await api.get('/api/tasks');
  return response.data;
};

const create = async (taskData) => {
  // taskData: { title, description, priority (0=Low, 1=Med, 2=High) }
  const response = await api.post('/api/tasks', taskData);
  return response.data;
};

const toggleStatus = async (id) => {
  const response = await api.patch(`/api/tasks/${id}/toggle`);
  return response.data;
};

const remove = async (id) => {
  await api.delete(`/api/tasks/${id}`);
};

export default { getAll, create, toggleStatus, remove };