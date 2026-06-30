import { useState, useEffect } from 'react';
import resourceService from '../services/resourceService';
import ResourceCard from '../components/ResourceCard';
import ResourceForm from '../components/ResourceForm';
import toast from 'react-hot-toast';

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  
  const fetchResources = async () => {
    try {
      setIsLoading(true);
      const data = await resourceService.getAll();
      setResources(data);
    } catch {
      setError('Failed to load resources');
    } finally {
      setIsLoading(false);
    }
  };
useEffect(() => {
   // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchResources();
  }, []);

  const handleCreate = async (data) => {
    try {
      setFormLoading(true);
      const newResource = await resourceService.create(data);
      setResources([newResource, ...resources]);
      setShowForm(false);
      toast.success('Resource added');
    } catch  {
      toast.error('Failed to add resource');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setFormLoading(true);
      const updated = await resourceService.update(editingResource.id, data);
      setResources(resources.map((r) => (r.id === editingResource.id ? updated : r)));
      setEditingResource(null);
      setShowForm(false);
      toast.success('Resource updated');
    } catch  {
      toast.error('Failed to update resource');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this resource?')) return;
    try {
      await resourceService.remove(id);
      setResources(resources.filter((r) => r.id !== id));
      toast.success('Resource deleted');
    } catch  {
      toast.error('Failed to delete resource');
    }
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingResource(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Resources</h1>
          <p className="text-sm text-gray-400 mt-0.5">Bookmark useful links and references</p>
        </div>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setEditingResource(null); }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Add Resource
          </button>
        )}
      </div>

      {showForm && (
        <ResourceForm
          initialData={editingResource}
          onSubmit={editingResource ? handleUpdate : handleCreate}
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
          <button onClick={fetchResources} className="mt-3 text-indigo-400 text-sm hover:underline">
            Try again
          </button>
        </div>
      ) : resources.length === 0 ? (
        <div className="text-center py-16 bg-[#1a1929] border border-dashed border-white/10 rounded-xl">
          <p className="text-4xl mb-3">🔗</p>
          <p className="text-gray-300 font-medium">No resources yet</p>
          <p className="text-gray-500 text-sm mt-1">Bookmark your first resource to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onEdit={() => handleEdit(resource)}
              onDelete={() => handleDelete(resource.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;