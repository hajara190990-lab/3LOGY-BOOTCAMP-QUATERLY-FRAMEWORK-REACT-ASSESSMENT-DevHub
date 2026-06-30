const STATUS_STYLES = {
  todo: 'bg-blue-400/20 text-blue-300',
  'in-progress': 'bg-amber-400/20 text-amber-300',
  done: 'bg-green-400/20 text-green-300',
};

const PRIORITY_STYLES = {
  low: 'bg-green-400/15 text-green-300',
  medium: 'bg-amber-400/15 text-amber-300',
  high: 'bg-red-400/15 text-red-300',
};

const STATUS_LABELS = {
  todo: 'Todo',
  'in-progress': 'In Progress',
  done: 'Done',
};

const STATUS_CYCLE = {
  todo: 'in-progress',
  'in-progress': 'done',
  done: 'todo',
};

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const statusStyle = STATUS_STYLES[task.status] || STATUS_STYLES.todo;
  const priorityStyle = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.medium;

  const handleToggleStatus = () => {
    const next = STATUS_CYCLE[task.status] || 'todo';
    onStatusChange(task.id, next);
  };

  return (
    <div className="bg-[#1a1929] border border-green-500/20 rounded-xl p-5 hover:border-green-500/40 transition-colors flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <p className="font-semibold text-white text-sm leading-tight">{task.title}</p>
        <div className="flex gap-1.5 shrink-0">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityStyle}`}>
            {task.priority}
          </span>
          <button
            onClick={handleToggleStatus}
            className={`text-xs font-medium px-2 py-0.5 rounded-full cursor-pointer hover:opacity-75 transition-opacity ${statusStyle}`}
            title="Click to advance status"
          >
            {STATUS_LABELS[task.status] || task.status}
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center gap-3 text-xs text-gray-500">
        {task.project && (
          <span className="bg-white/5 px-2 py-0.5 rounded text-gray-400">📁 {task.project}</span>
        )}
        {task.dueDate && (
          <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
        )}
      </div>

      <div className="flex gap-2 pt-1 border-t border-green-500/10">
        <button onClick={onEdit} className="text-xs text-gray-400 hover:text-green-300 transition-colors">
          Edit
        </button>
        <span className="text-gray-700">|</span>
        <button onClick={onDelete} className="text-xs text-gray-400 hover:text-red-400 transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;