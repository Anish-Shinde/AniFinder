import { Link } from "react-router-dom";
import { useWatch } from "../context/WatchContext";

export const Navbar: React.FC = () => {
  const { getWatchedAnimeCount } = useWatch();
  const watchCount = getWatchedAnimeCount();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-lg border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🔍
            </div>
            <span className="text-xl font-bold text-white group-hover:text-purple-300 transition">
              AniFinder
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition font-medium"
            >
              Home
            </Link>
            <Link
              to="/genres"
              className="text-gray-300 hover:text-white transition font-medium"
            >
              Genres
            </Link>
            <Link
              to="/recommendations"
              className="text-gray-300 hover:text-white transition font-medium"
            >
              Recommendations
            </Link>
            <Link
              to="/watch-history"
              className="relative text-gray-300 hover:text-white transition font-medium"
            >
              <span>My List</span>
              {watchCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {watchCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
