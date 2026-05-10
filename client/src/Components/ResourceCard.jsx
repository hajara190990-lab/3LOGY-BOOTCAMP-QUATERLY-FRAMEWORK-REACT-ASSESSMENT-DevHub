export default function ResourceCard({ resource, onEdit, onDelete }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white">
      <h3 className="text-lg font-semibold">{resource.title}</h3>
      <p className="text-gray-400 mt-2">{resource.description}</p>
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 hover:underline mt-2 block"
      >
        {resource.url}
      </a>
      <div className="flex justify-end gap-3 mt-3">
        <button
          onClick={() => onEdit(resource)}
          className="text-blue-400 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(resource.id)}
          className="text-red-400 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
