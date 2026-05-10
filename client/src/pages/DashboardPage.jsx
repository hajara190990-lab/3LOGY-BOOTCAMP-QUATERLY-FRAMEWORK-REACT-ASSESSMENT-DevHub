import { useState, useEffect } from 'react';
import dashboardService from '../services/dashboardService';
import { toast } from 'react-hot-toast';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await dashboardService.getStats();
        setStats(data);
      } catch (err) {
        toast.error("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;

  const cards = [
    { label: 'Code Snippets', value: stats?.totalSnippets || 0, color: 'bg-blue-500' },
    { label: 'Resources', value: stats?.totalResources || 0, color: 'bg-purple-500' },
    { label: 'Pending Tasks', value: stats?.pendingTasks || 0, color: 'bg-amber-500' },
    { label: 'Completed', value: stats?.completedTasks || 0, color: 'bg-emerald-500' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Developer Command Center</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{card.label}</p>
            <div className="flex items-center mt-2">
              <div className={`h-2 w-2 rounded-full ${card.color} mr-2`}></div>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mb-10">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Task Completion Progress</h2>
        <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-500" 
            style={{ 
              width: `${(stats?.completedTasks / (stats?.completedTasks + stats?.pendingTasks) * 100) || 0}%` 
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {stats?.completedTasks} of {(stats?.completedTasks + stats?.pendingTasks) || 0} tasks finished
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Short Welcome / Tips Card */}
        <div className="bg-indigo-900 text-white p-8 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-2">Welcome Back!</h3>
          <p className="text-indigo-200 mb-6">You have {stats?.pendingTasks} tasks that need your attention today. Don't forget to document your new snippets!</p>
          <button className="bg-white text-indigo-900 px-4 py-2 rounded-lg font-bold hover:bg-indigo-50 transition">
            View My Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;