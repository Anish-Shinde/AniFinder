import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Anime } from "../types";
import { getTrendingAnime, getAnimeByGenre } from "../services/api";
import { useWatch } from "../context/WatchContext";
import { getRecommendedAnime, getTopGenres } from "../utils/recommendation";
import { AnimeCard } from "../components/AnimeCard";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Recommendations: React.FC = () => {
  const navigate = useNavigate();
  const { watched } = useWatch();
  const [recommendations, setRecommendations] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [topGenres, setTopGenres] = useState<Array<{ name: string; count: number }>>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        if (watched.length === 0) {
          // No watch history, show trending
          const trending = await getTrendingAnime();
          setRecommendations(trending || []);
          return;
        }

        // Get top genres
        const genres = getTopGenres(watched, 2);
        const genreInfo = genres.map((g) => ({
          mal_id: g.mal_id,
          name: g.name,
          count: g.count,
        }));
        setTopGenres(genreInfo);

        // Fetch anime from top genres
        let candidateAnime: Anime[] = [];
        for (const genre of genres.slice(0, 2)) {
          try {
            const data = await getAnimeByGenre(genre.mal_id, 1);
            candidateAnime = [...candidateAnime, ...(data || [])];
          } catch (error) {
            console.error(`Failed to fetch anime for genre ${genre.mal_id}:`, error);
          }
        }

        // If we don't have enough candidates, add trending
        if (candidateAnime.length < 20) {
          const trending = await getTrendingAnime();
          candidateAnime = [...candidateAnime, ...(trending || [])];
        }

        // Get recommendations
        const recommended = getRecommendedAnime(candidateAnime, watched);
        setRecommendations(recommended);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [watched]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            ✨ Recommended for You
          </h1>
          <p className="text-gray-400">
            {watched.length === 0
              ? "Add anime to your list to get personalized recommendations!"
              : `Based on ${watched.length} anime in your list`}
          </p>
        </div>

        {/* Top Genres Info */}
        {topGenres.length > 0 && (
          <div className="mb-8 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg">
            <p className="text-sm text-gray-300 mb-2">📊 Your top genres:</p>
            <div className="flex flex-wrap gap-2">
              {topGenres.map((genre, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-purple-500/40 text-purple-300 rounded-full text-sm font-semibold border border-purple-500/50"
                >
                  {genre.name} ({genre.count})
                </span>
              ))}
            </div>
          </div>
        )}

        {watched.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Start your journey!
            </h2>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Add anime to your watch list to unlock personalized recommendations
              based on your favorite genres and viewing history.
            </p>
            <button
              onClick={() => navigate("/genres")}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Browse & Add Anime
            </button>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              No recommendations available at the moment. Try again later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {recommendations.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
