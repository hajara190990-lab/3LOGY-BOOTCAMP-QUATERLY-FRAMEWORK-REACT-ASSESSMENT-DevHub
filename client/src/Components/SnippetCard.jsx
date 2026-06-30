import { useNavigate } from 'react-router-dom';

const LANGUAGE_COLORS = {
  javascript: 'bg-amber-400/15 text-amber-300',
  typescript: 'bg-blue-400/15 text-blue-300',
  python: 'bg-green-400/15 text-green-300',
  csharp: 'bg-violet-400/15 text-violet-300',
  html: 'bg-orange-400/15 text-orange-300',
  css: 'bg-pink-400/15 text-pink-300',
  sql: 'bg-cyan-400/15 text-cyan-300',
  java: 'bg-red-400/15 text-red-300',
  other: 'bg-gray-400/15 text-gray-300',
};

const SnippetCard = ({ snippet, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const langColor = LANGUAGE_COLORS[snippet.language] || LANGUAGE_COLORS.other;

  const codePreview = snippet.code
    ? snippet.code.split('\n').slice(0, 4).join('\n')
    : '';

  const tags = Array.isArray(snippet.tags) ? snippet.tags : [];

  return (
    <div className="bg-[#1a1929] border border-violet-500/20 rounded-xl p-5 hover:border-violet-500/40 transition-colors flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <button
          onClick={() => navigate(`/snippets/${snippet.id}`)}
          className="text-left font-semibold text-white hover:text-violet-300 transition-colors text-sm leading-tight"
        >
          {snippet.title}
        </button>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${langColor}`}>
          {snippet.language}
        </span>
      </div>

      {snippet.description && (
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
          {snippet.description}
        </p>
      )}

      {codePreview && (
        <pre className="bg-black/30 border border-white/5 rounded-lg p-3 text-xs font-mono text-gray-300 overflow-hidden line-clamp-4 leading-relaxed">
          {codePreview}
        </pre>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, i) => (
            <span key={i} className="text-xs bg-violet-500/15 text-violet-300 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 pt-1 border-t border-violet-500/10">
        <button
          onClick={onEdit}
          className="text-xs text-gray-400 hover:text-violet-300 transition-colors"
        >
          Edit
        </button>
        <span className="text-gray-700">|</span>
        <button
          onClick={onDelete}
          className="text-xs text-gray-400 hover:text-red-400 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SnippetCard;