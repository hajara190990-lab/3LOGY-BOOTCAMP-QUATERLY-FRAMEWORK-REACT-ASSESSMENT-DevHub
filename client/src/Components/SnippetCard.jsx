export default function SnippetCard({ snippet, onEdit, onDelete }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{snippet.title}</h3>
        <span className="text-sm text-purple-400">{snippet.language}</span>
      </div>
      <p className="text-gray-400 mt-2">{snippet.description}</p>
      <pre className="bg-gray-900 p-3 rounded mt-3 text-sm overflow-x-auto">
        {snippet.code}
      </pre>
      <div className="flex justify-end gap-3 mt-3">
        <button
          onClick={() => onEdit(snippet)}
          className="text-blue-400 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(snippet.id)}
          className="text-red-400 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
