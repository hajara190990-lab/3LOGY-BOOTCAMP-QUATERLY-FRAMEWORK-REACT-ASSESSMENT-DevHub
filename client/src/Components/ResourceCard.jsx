const TYPE_COLORS = {
  article: 'bg-indigo-400/15 text-indigo-300',
  video: 'bg-red-400/15 text-red-300',
  tool: 'bg-green-400/15 text-green-300',
  docs: 'bg-violet-400/15 text-violet-300',
  other: 'bg-gray-400/15 text-gray-300',
};

const ResourceCard = ({ resource, onEdit, onDelete }) => {
  const typeColor = TYPE_COLORS[resource.type] || TYPE_COLORS.other;
  const tags = Array.isArray(resource.tags) ? resource.tags : [];

  return (
    <div className="bg-[#1a1929] border border-indigo-500/20 rounded-xl p-5 hover:border-indigo-500/40 transition-colors flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <a>
         href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-indigo-400 hover:underline truncate"
        
          {resource.title}
        </a>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${typeColor}`}>
          {resource.type}
        </span>
      </div>

      {resource.url && (
        <a>
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-indigo-400 hover:underline truncate"
        
          {resource.url}
        </a>
      )}

      {resource.notes && (
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{resource.notes}</p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, i) => (
            <span key={i} className="text-xs bg-indigo-500/15 text-indigo-300 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 pt-1 border-t border-indigo-500/10">
        <button onClick={onEdit} className="text-xs text-gray-400 hover:text-indigo-300 transition-colors">
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

export default ResourceCard;