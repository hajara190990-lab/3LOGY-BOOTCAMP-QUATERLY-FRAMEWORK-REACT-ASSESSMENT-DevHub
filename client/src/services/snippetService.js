import api from './api';

const getAll = async () => {
  const response = await api.get('/api/snippets');
  return response.data;
};

const create = async (snippetData) => {
  // snippetData: { title, language, content, description, tags }
  const response = await api.post('/api/snippets', snippetData);
  return response.data;
};

const update = async (id, snippetData) => {
  const response = await api.put(`/api/snippets/${id}`, snippetData);
  return response.data;
};

const remove = async (id) => {
  await api.delete(`/api/snippets/${id}`);
};

export default { getAll, create, update, remove };