import { useState, useEffect } from 'react';
import snippetService from '../services/snippetService';
import { toast } from 'react-hot-toast';

const SnippetsPage = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSnippets();
  }, []);

  const loadSnippets = async () => {
    try {
      const data = await snippetService.getAll();
      setSnippets(data);
    } catch (err) {
      toast.error("Failed to load snippets");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await snippetService.remove(id);
      setSnippets(snippets.filter(s => s.id !== id));
      toast.success("Snippet deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading snippets...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Snippets</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          + New Snippet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snippets.map(snippet => (
          <div key={snippet.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start mb-3">
              <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded uppercase">
                {snippet.language}
              </span>
              <button 
                onClick={() => handleDelete(snippet.id)}
                className="text-gray-400 hover:text-red-500"
              >
                Delete
              </button>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">{snippet.title}</h3>
            <pre className="bg-gray-900 text-gray-100 p-3 rounded-md text-sm mb-4 overflow-x-auto">
              <code>{snippet.content.substring(0, 100)}...</code>
            </pre>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{snippet.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SnippetsPage;