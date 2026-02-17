import { useNavigate } from "react-router-dom";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-4">
          404
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-gray-400 mb-8">
          The anime you're looking for doesn't exist in our database.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
