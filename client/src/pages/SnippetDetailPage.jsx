import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import snippetService from '../services/snippetService';
import toast from 'react-hot-toast';

const LANGUAGE_COLORS = {
  javascript: 'bg-yellow-100 text-yellow-800',
  typescript: 'bg-blue-100 text-blue-800',
  python: 'bg-green-100 text-green-800',
  csharp: 'bg-purple-100 text-purple-800',
  html: 'bg-orange-100 text-orange-800',
  css: 'bg-pink-100 text-pink-800',
  sql: 'bg-cyan-100 text-cyan-800',
  java: 'bg-red-100 text-red-800',
  other: 'bg-gray-100 text-gray-700',
};

const SnippetDetailPage = () => {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        setIsLoading(true);
        const data = await snippetService.getById(id);
        setSnippet(data);
      } catch (err) {
        setError('Snippet not found');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSnippet();
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    toast.success('Code copied to clipboard');
  };

  if (isLoading) return (
    <div className="flex justify-center py-16">
      <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error || !snippet) return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <p className="text-red-500">{error}</p>
      <Link to="/snippets" className="mt-4 inline-block text-indigo-600 hover:underline text-sm">← Back to snippets</Link>
    </div>
  );

  const langColor = LANGUAGE_COLORS[snippet.language] || LANGUAGE_COLORS.other;
  const tags = Array.isArray(snippet.tags) ? snippet.tags : [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/snippets" className="text-sm text-indigo-600 hover:underline mb-6 inline-block">
        ← Back to snippets
      </Link>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-xl font-bold text-gray-900">{snippet.title}</h1>
          <span className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${langColor}`}>
            {snippet.language}
          </span>
        </div>
        {snippet.description && (
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">{snippet.description}</p>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.map((tag, i) => (
              <span key={i} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between bg-gray-800 rounded-t-lg px-4 py-2">
          <span className="text-xs text-gray-400 font-mono">{snippet.language}</span>
          <button onClick={handleCopy} className="text-xs text-gray-300 hover:text-white transition-colors">
            Copy code
          </button>
        </div>
        <pre className="bg-gray-900 text-gray-100 rounded-b-lg p-4 overflow-x-auto text-sm font-mono leading-relaxed">
          {snippet.code}
        </pre>
        {snippet.createdAt && (
          <p className="text-xs text-gray-400 mt-4">
            Created {new Date(snippet.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default SnippetDetailPage;