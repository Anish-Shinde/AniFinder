import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Anime } from "../types";
import { getAnimeDetails } from "../services/api";
import { useWatch } from "../context/WatchContext";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const AnimeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAnimeWatched, addToWatched, removeFromWatched, updateWatchStatus } =
    useWatch();

  const mal_id = parseInt(id || "0");
  const watched = isAnimeWatched(mal_id);

  useEffect(() => {
    const fetchAnime = async () => {
      if (!mal_id) {
        setError("Invalid anime ID");
        setLoading(false);
        return;
      }

      try {
        const data = await getAnimeDetails(mal_id);
        setAnime(data);
      } catch (err) {
        console.error("Failed to fetch anime details:", err);
        setError("Failed to load anime details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [mal_id]);

  const handleAddToWatched = () => {
    if (!anime) return;

    addToWatched({
      mal_id: anime.mal_id,
      title: anime.title,
      image: anime.images.jpg.large_image_url,
      genres: anime.genres,
      status: "watching",
    });
  };

  const handleRemove = () => {
    removeFromWatched(mal_id);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !anime) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-white mb-4">{error}</h2>
            <button
              onClick={() => navigate("/genres")}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold"
            >
              Back to Browse
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition font-semibold"
        >
          ← Back
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Image & Actions */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <div className="rounded-lg overflow-hidden shadow-2xl mb-6">
                <img
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  className="w-full"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {!watched ? (
                  <button
                    onClick={handleAddToWatched}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                  >
                    + Add to My List
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleRemove}
                      className="w-full py-3 bg-red-500/30 text-red-300 rounded-lg font-bold border border-red-500/50 hover:bg-red-500/40 transition-all"
                    >
                      ✕ Remove from List
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => updateWatchStatus(mal_id, "watching")}
                        className="py-2 bg-blue-500/30 text-blue-300 rounded-lg font-semibold border border-blue-500/50 hover:bg-blue-500/40 transition-all text-sm"
                      >
                        Currently Watching
                      </button>
                      <button
                        onClick={() => updateWatchStatus(mal_id, "watched")}
                        className="py-2 bg-green-500/30 text-green-300 rounded-lg font-semibold border border-green-500/50 hover:bg-green-500/40 transition-all text-sm"
                      >
                        Watched
                      </button>
                    </div>
                    <button
                      onClick={() => updateWatchStatus(mal_id, "favorite")}
                      className="w-full py-2 bg-yellow-500/30 text-yellow-300 rounded-lg font-semibold border border-yellow-500/50 hover:bg-yellow-500/40 transition-all text-sm"
                    >
                      ❤️ Favorite
                    </button>
                  </>
                )}
              </div>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700 space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Rating</p>
                  <p className="text-lg font-bold text-yellow-400">
                    ⭐ {anime.score.toFixed(1)}/10
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Ranked</p>
                  <p className="text-lg font-bold text-white">#{anime.rank}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Episodes</p>
                  <p className="text-lg font-bold text-white">
                    {anime.episodes || "Unknown"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <p className="text-lg font-bold text-purple-400">
                    {anime.status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:col-span-2">
            {/* Title */}
            <h1 className="text-4xl font-bold text-white mb-2">
              {anime.title}
            </h1>
            <p className="text-gray-400 mb-6">
              {anime.type} • {anime.episodes} Episodes • {anime.year || "N/A"}
            </p>

            {/* Genres */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((genre) => (
                  <span
                    key={genre.mal_id}
                    className="px-3 py-1 bg-purple-500/30 text-purple-300 rounded-full border border-purple-500/50 text-sm font-medium"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Synopsis */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-3">Synopsis</h3>
              <p className="text-gray-300 leading-relaxed">
                {anime.synopsis || "No synopsis available"}
              </p>
            </div>

            {/* Studios */}
            {anime.studios && anime.studios.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">Studios</h3>
                <div className="flex flex-wrap gap-2">
                  {anime.studios.map((studio) => (
                    <span
                      key={studio.mal_id}
                      className="px-3 py-1 bg-slate-700 text-slate-200 rounded border border-slate-600"
                    >
                      {studio.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Trailer */}
            {anime.trailer?.youtube_id && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">Trailer</h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                    title="Anime Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <p className="text-gray-400 text-sm mb-1">Scored by</p>
                <p className="text-xl font-bold text-white">
                  {(anime.scored_by / 1000).toFixed(1)}K
                </p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <p className="text-gray-400 text-sm mb-1">Popularity</p>
                <p className="text-xl font-bold text-white">
                  {anime.popularity ? `#${anime.popularity}` : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
