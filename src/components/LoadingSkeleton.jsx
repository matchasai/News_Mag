const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse bg-white shadow-md rounded-lg p-4 w-full max-w-sm">
      <div className="h-40 bg-gray-300 rounded-md"></div>
      <div className="mt-4 space-y-2">
        <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded-md w-full"></div>
        <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="h-4 bg-gray-300 rounded-md w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;