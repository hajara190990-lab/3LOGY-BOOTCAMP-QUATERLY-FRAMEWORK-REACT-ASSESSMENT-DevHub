import { useState, useEffect } from 'react';
import resourceService from '../services/resourceService';
import { toast } from 'react-hot-toast';

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const data = await resourceService.getAll();
      setResources(data);
    } catch (err) {
      toast.error("Failed to load resources");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading bookmarks...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Learning Resources</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          + Add Link
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map(res => (
          <div key={res.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded uppercase">
              {res.category || 'General'}
            </span>
            <h3 className="font-bold text-lg mt-3 text-gray-900">{res.title}</h3>
            <p className="text-gray-600 text-sm mt-2 mb-4 line-clamp-2">{res.description}</p>
            <a 
              href={res.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline text-sm font-medium"
            >
              Visit Resource →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;