import { useState, useEffect } from 'react';
import taskService from '../services/taskService';
import { toast } from 'react-hot-toast';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      toast.error("Could not load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      await taskService.toggleStatus(id);
      setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 2: return "bg-red-100 text-red-700 border-red-200"; // High
      case 1: return "bg-yellow-100 text-yellow-700 border-yellow-200"; // Medium
      default: return "bg-blue-100 text-blue-700 border-blue-200"; // Low
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading your list...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Developer Tasks</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          + Add Task
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className={`flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm transition ${task.isCompleted ? 'opacity-60' : ''}`}
          >
            <div className="flex items-center space-x-4">
              <input 
                type="checkbox" 
                checked={task.isCompleted}
                onChange={() => handleToggle(task.id)}
                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <h3 className={`font-semibold ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getPriorityStyle(task.priority)}`}>
                  {task.priority === 2 ? 'High' : task.priority === 1 ? 'Medium' : 'Low'}
                </span>
              </div>
            </div>
            
            <button 
              onClick={async () => {
                await taskService.remove(task.id);
                setTasks(tasks.filter(t => t.id !== task.id));
                toast.success("Task removed");
              }}
              className="text-gray-400 hover:text-red-500 px-2"
            >
              &times;
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="text-center text-gray-500 py-10">No tasks found. Time to relax?</p>
        )}
      </div>
    </div>
  );
};

export default TasksPage;