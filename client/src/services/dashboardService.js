import api from './api';

const getStats = async () => {
  const response = await api.get('/api/dashboard/stats');
  // Expected response: { totalSnippets, totalResources, pendingTasks, completedTasks }
  return response.data;
};

const getRecentItems = async () => {
  const response = await api.get('/api/dashboard/recent');
  return response.data;
};

export default { getStats, getRecentItems };