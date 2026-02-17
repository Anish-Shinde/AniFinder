import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Anime } from "../types";
import { getTrendingAnime } from "../services/api";
import { AnimeCard } from "../components/AnimeCard";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Home: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingAnime();
        setAnimeList(data || []);
      } catch (error) {
        console.error("Failed to fetch trending anime:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="relative rounded-2xl overflow-hidden h-80 md:h-96 bg-gradient-to-r from-purple-900 via-slate-900 to-pink-900 border border-purple-500/30">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm" />
            <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Welcome to <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AniFinder</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-6 max-w-2xl">
                Discover amazing anime, track your watched list, and get personalized recommendations based on your preferences.
              </p>
              <button
                onClick={() => navigate("/genres")}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-200"
              >
                Start Exploring →
              </button>
            </div>
          </div>
        </div>

        {/* Trending Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">🔥 Trending Now</h2>
            <button
              onClick={() => navigate("/genres")}
              className="text-purple-400 hover:text-purple-300 transition font-semibold"
            >
              View All →
            </button>
          </div>

          {animeList.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No anime found. Try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {animeList.slice(0, 10).map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-purple-500/30 hover:border-purple-500/60 transition">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-xl font-bold text-white mb-2">Browse by Genre</h3>
            <p className="text-gray-400">
              Explore thousands of anime across different genres.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-purple-500/30 hover:border-purple-500/60 transition">
            <div className="text-3xl mb-3">❤️</div>
            <h3 className="text-xl font-bold text-white mb-2">Track Progress</h3>
            <p className="text-gray-400">
              Keep track of what you're watching and what you've watched.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-purple-500/30 hover:border-purple-500/60 transition">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="text-xl font-bold text-white mb-2">Smart Recommendations</h3>
            <p className="text-gray-400">
              Get personalized anime recommendations based on your history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
