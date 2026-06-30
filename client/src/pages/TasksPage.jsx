import { useState, useEffect } from 'react';
import taskService from '../services/taskService';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import toast from 'react-hot-toast';

const FILTERS = ['all', 'todo', 'in-progress', 'done'];
const FILTER_LABELS = { all: 'All', todo: 'Todo', 'in-progress': 'In Progress', done: 'Done' };

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await taskService.getAll();
      setTasks(data);
    } catch {
      setError('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchTasks();
}, []);

  const handleCreate = async (data) => {
    try {
      setFormLoading(true);
      const newTask = await taskService.create(data);
      setTasks([newTask, ...tasks]);
      setShowForm(false);
      toast.success('Task created');
    } catch  {
      toast.error('Failed to create task');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setFormLoading(true);
      const updated = await taskService.update(editingTask.id, data);
      setTasks(tasks.map((t) => (t.id === editingTask.id ? updated : t)));
      setEditingTask(null);
      setShowForm(false);
      toast.success('Task updated');
    } catch  {
      toast.error('Failed to update task');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await taskService.remove(id);
      setTasks(tasks.filter((t) => t.id !== id));
      toast.success('Task deleted');
    } catch  {
      toast.error('Failed to delete task');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await taskService.updateStatus(id, status);
      setTasks(tasks.map((t) => (t.id === id ? updated : t)));
      toast.success('Status updated');
    } catch  {
      toast.error('Failed to update status');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const filteredTasks =
    activeFilter === 'all' ? tasks : tasks.filter((t) => t.status === activeFilter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Tasks</h1>
          <p className="text-sm text-gray-400 mt-0.5">Track what you're working on</p>
        </div>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setEditingTask(null); }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + New Task
          </button>
        )}
      </div>

      {showForm && (
        <TaskForm
          initialData={editingTask}
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onCancel={handleCancel}
          isLoading={formLoading}
        />
      )}

      <div className="flex gap-1 mb-6 bg-[#1a1929] p-1 rounded-lg w-fit">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeFilter === filter
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {FILTER_LABELS[filter]}
            {filter !== 'all' && (
              <span className="ml-1.5 text-xs text-gray-500">
                ({tasks.filter((t) => t.status === filter).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-red-400">{error}</p>
          <button onClick={fetchTasks} className="mt-3 text-indigo-400 text-sm hover:underline">
            Try again
          </button>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-16 bg-[#1a1929] border border-dashed border-white/10 rounded-xl">
          <p className="text-4xl mb-3">✅</p>
          <p className="text-gray-300 font-medium">
            {activeFilter === 'all' ? 'No tasks yet' : `No ${FILTER_LABELS[activeFilter]} tasks`}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {activeFilter === 'all' ? 'Create your first task to get started' : 'Try a different filter'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => handleEdit(task)}
              onDelete={() => handleDelete(task.id)}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksPage;