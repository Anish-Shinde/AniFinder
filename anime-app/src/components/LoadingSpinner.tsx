export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-purple-500 border-r-pink-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🔍</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
