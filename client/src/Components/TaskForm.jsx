import { useState, useEffect } from 'react';

const TaskForm = ({ initialData = null, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '', description: '', status: 'todo', priority: 'medium', project: '', dueDate: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'todo',
        priority: initialData.priority || 'medium',
        project: initialData.project || '',
        dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) { setErrors({ title: 'Title is required' }); return; }
    onSubmit(formData);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{initialData ? 'Edit Task' : 'New Task'}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="What needs to be done?"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.title ? 'border-red-400' : 'border-gray-300'}`}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={2} placeholder="Add more details..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select name="status" value={formData.status} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select name="priority" value={formData.priority} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
            <input type="text" name="project" value={formData.project} onChange={handleChange} placeholder="Project name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
            {isLoading ? 'Saving...' : (initialData ? 'Save changes' : 'Create task')}
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

export default TaskForm;