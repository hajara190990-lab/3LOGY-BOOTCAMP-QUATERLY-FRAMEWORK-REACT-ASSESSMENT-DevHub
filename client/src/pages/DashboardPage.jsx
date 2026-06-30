import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/dashboard/stats');
      setStats(response.data);
    } catch {
      setError('Failed to load dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
     // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStats();
  }, []);

  if (isLoading) return (
    <div className="flex justify-center py-16">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center">
      <p className="text-red-400">{error}</p>
    </div>
  );

  const taskTotal =
    (stats?.tasksByStatus?.todo || 0) +
    (stats?.tasksByStatus?.['in-progress'] || 0) +
    (stats?.tasksByStatus?.done || 0);

  const getBarWidth = (count) =>
    taskTotal > 0 ? Math.round((count / taskTotal) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Welcome back, <span className="text-violet-400">{user.userName || 'Dev'}</span> 👋
        </h1>
        <p className="text-gray-400 text-sm mt-1">Here's what's on your shelf today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Snippets - violet */}
        <Link to="/snippets" className="bg-violet-600 hover:bg-violet-700 transition-colors rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-white">{stats?.totalSnippets ?? '0'}</p>
            <p className="text-violet-200 text-sm mt-1">Snippets</p>
          </div>
          <span className="text-4xl opacity-80">📋</span>
        </Link>

        {/* Resources - indigo */}
        <Link to="/resources" className="bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-white">{stats?.totalResources ?? '0'}</p>
            <p className="text-indigo-200 text-sm mt-1">Resources</p>
          </div>
          <span className="text-4xl opacity-80">🔗</span>
        </Link>

        {/* Tasks - green */}
        <Link to="/tasks" className="bg-green-600 hover:bg-green-700 transition-colors rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-white">{stats?.totalTasks ?? '0'}</p>
            <p className="text-green-200 text-sm mt-1">Tasks</p>
          </div>
          <span className="text-4xl opacity-80">✅</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task status breakdown */}
        <div className="bg-[#1a1929] border border-white/5 rounded-xl p-6">
          <h2 className="text-base font-semibold text-white mb-4">Tasks Overview</h2>
          <div className="space-y-3">
            {[
              { key: 'todo', label: 'Todo', color: 'bg-blue-500' },
              { key: 'in-progress', label: 'In Progress', color: 'bg-amber-500' },
              { key: 'done', label: 'Done', color: 'bg-green-500' },
            ].map(({ key, label, color }) => {
              const count = stats?.tasksByStatus?.[key] || 0;
              return (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-white font-medium">{count}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full transition-all duration-500`}
                      style={{ width: `${getBarWidth(count)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent items */}
        {stats?.recentSnippets?.length > 0 && (
          <div className="bg-[#1a1929] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white">Recent Snippets</h2>
              <Link to="/snippets" className="text-xs text-violet-400 hover:underline">View all</Link>
            </div>
            <div className="space-y-2">
              {stats.recentSnippets.slice(0, 5).map((s) => (
                <Link key={s.id} to={`/snippets/${s.id}`}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 hover:text-violet-300 transition-colors">
                  <span className="text-sm text-gray-300 truncate">{s.title}</span>
                  <span className="text-xs text-gray-500 ml-2 shrink-0">{s.language}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {stats?.recentTasks?.length > 0 && (
          <div className="bg-[#1a1929] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white">Recent Tasks</h2>
              <Link to="/tasks" className="text-xs text-green-400 hover:underline">View all</Link>
            </div>
            <div className="space-y-2">
              {stats.recentTasks.slice(0, 5).map((t) => (
                <div key={t.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-sm text-gray-300 truncate">{t.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ml-2 shrink-0 ${
                    t.status === 'done'
                      ? 'bg-green-400/20 text-green-300'
                      : t.status === 'in-progress'
                      ? 'bg-amber-400/20 text-amber-300'
                      : 'bg-blue-400/20 text-blue-300'
                  }`}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {stats?.recentResources?.length > 0 && (
          <div className="bg-[#1a1929] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white">Recent Resources</h2>
              <Link to="/resources" className="text-xs text-indigo-400 hover:underline">View all</Link>
            </div>
            <div className="space-y-2">
              {stats.recentResources.slice(0, 5).map((r) => (
                <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 hover:text-indigo-300 transition-colors">
                  <span className="text-sm text-gray-300 truncate">{r.title}</span>
                  <span className="text-xs text-gray-500 ml-2 shrink-0">{r.type}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;