const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      <p className="mt-4 text-gray-500 font-medium">Syncing with DevShelf...</p>
    </div>
  );
};

export default Loader;
