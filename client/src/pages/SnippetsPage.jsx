import { useState, useEffect } from 'react';
import snippetService from '../services/snippetService';
import SnippetCard from '../components/SnippetCard';
import SnippetForm from '../components/SnippetForm';
import toast from 'react-hot-toast';

const SnippetsPage = () => {
  const [snippets, setSnippets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

 

  const fetchSnippets = async () => {
    try {
      setIsLoading(true);
      const data = await snippetService.getAll();
      setSnippets(data);
    } catch  {
      setError('Failed to load snippets');
    } finally {
      setIsLoading(false);
    }
  };
   useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchSnippets();
}, []);
  const handleCreate = async (data) => {
    try {
      setFormLoading(true);
      const newSnippet = await snippetService.create(data);
      setSnippets([newSnippet, ...snippets]);
      setShowForm(false);
      toast.success('Snippet created');
    } catch  {
      toast.error('Failed to create snippet');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setFormLoading(true);
      const updated = await snippetService.update(editingSnippet.id, data);
      setSnippets(snippets.map((s) => (s.id === editingSnippet.id ? updated : s)));
      setEditingSnippet(null);
      setShowForm(false);
      toast.success('Snippet updated');
    } catch  {
      toast.error('Failed to update snippet');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this snippet?')) return;
    try {
      await snippetService.remove(id);
      setSnippets(snippets.filter((s) => s.id !== id));
      toast.success('Snippet deleted');
    } catch  {
      toast.error('Failed to delete snippet');
    }
  };

  const handleEdit = (snippet) => {
    setEditingSnippet(snippet);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSnippet(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Snippets</h1>
          <p className="text-sm text-gray-400 mt-0.5">Save and reuse your code snippets</p>
        </div>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setEditingSnippet(null); }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + New Snippet
          </button>
        )}
      </div>

      {showForm && (
        <SnippetForm
          initialData={editingSnippet}
          onSubmit={editingSnippet ? handleUpdate : handleCreate}
          onCancel={handleCancel}
          isLoading={formLoading}
        />
      )}

      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-red-400">{error}</p>
          <button onClick={fetchSnippets} className="mt-3 text-indigo-400 text-sm hover:underline">
            Try again
          </button>
        </div>
      ) : snippets.length === 0 ? (
        <div className="text-center py-16 bg-[#1a1929] border border-dashed border-white/10 rounded-xl">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-gray-300 font-medium">No snippets yet</p>
          <p className="text-gray-500 text-sm mt-1">Create your first snippet to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {snippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onEdit={() => handleEdit(snippet)}
              onDelete={() => handleDelete(snippet.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SnippetsPage;