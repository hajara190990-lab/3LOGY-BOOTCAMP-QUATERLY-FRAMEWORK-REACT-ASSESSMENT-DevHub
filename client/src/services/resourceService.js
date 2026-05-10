import api from './api';

const getAll = async () => {
  const response = await api.get('/api/resources');
  return response.data;
};

const create = async (resourceData) => {
  // resourceData: { title, url, description, category }
  const response = await api.post('/api/resources', resourceData);
  return response.data;
};

const remove = async (id) => {
  await api.delete(`/api/resources/${id}`);
};

export default { getAll, create, remove };