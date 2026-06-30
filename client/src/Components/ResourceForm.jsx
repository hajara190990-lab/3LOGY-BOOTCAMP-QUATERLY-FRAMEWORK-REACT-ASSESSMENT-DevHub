import { useState, useEffect } from 'react';

const TYPES = ['article', 'video', 'tool', 'docs', 'other'];

const ResourceForm = ({ initialData = null, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({ title: '', url: '', notes: '', type: 'article', tags: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        title: initialData.title || '',
        url: initialData.url || '',
        notes: initialData.notes || '',
        type: initialData.type || 'article',
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : (initialData.tags || ''),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.url.trim()) newErrors.url = 'URL is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    const tagsArray = formData.tags ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];
    onSubmit({ ...formData, tags: tagsArray });
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{initialData ? 'Edit Resource' : 'New Resource'}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Resource name"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.title ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select name="type" value={formData.type} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL *</label>
          <input type="url" name="url" value={formData.url} onChange={handleChange} placeholder="https://..."
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.url ? 'border-red-400' : 'border-gray-300'}`}
          />
          {errors.url && <p className="text-red-500 text-xs mt-1">{errors.url}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} placeholder="Why is this resource useful?"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="react, tutorial (comma-separated)"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
            {isLoading ? 'Saving...' : (initialData ? 'Save changes' : 'Add resource')}
          </button>
          <button type="button" onClick={onCancel}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResourceForm;