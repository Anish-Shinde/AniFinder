import { useNavigate } from "react-router-dom";
import { useWatch } from "../context/WatchContext";
import type { WatchedAnime } from "../types";

export const WatchHistory: React.FC = () => {
  const navigate = useNavigate();
  const { watched, removeFromWatched, updateWatchStatus } = useWatch();

  const watching = watched.filter((a) => a.status === "watching");
  const completed = watched.filter((a) => a.status === "watched");
  const favorites = watched.filter((a) => a.status === "favorite");

  const renderAnimeList = (animeList: WatchedAnime[], title: string) => {
    if (animeList.length === 0) {
      return null;
    }

    return (
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <span className="text-sm bg-purple-500/30 text-purple-300 px-3 py-1 rounded-full">
            {animeList.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {animeList.map((anime) => (
            <div
              key={anime.mal_id}
              className="flex gap-4 bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-purple-500/50 transition group"
            >
              <img
                src={anime.image}
                alt={anime.title}
                className="w-20 h-28 rounded object-cover cursor-pointer group-hover:opacity-80 transition"
                onClick={() => navigate(`/anime/${anime.mal_id}`)}
              />

              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3
                    className="font-bold text-white mb-1 line-clamp-2 cursor-pointer hover:text-purple-300 transition"
                    onClick={() => navigate(`/anime/${anime.mal_id}`)}
                  >
                    {anime.title}
                  </h3>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {anime.genres.slice(0, 2).map((genre) => (
                      <span
                        key={genre.mal_id}
                        className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => removeFromWatched(anime.mal_id)}
                    className="text-xs bg-red-500/20 text-red-300 hover:bg-red-500/30 px-2 py-1 rounded transition"
                  >
                    Remove
                  </button>
                  {anime.status !== "favorite" && (
                    <button
                      onClick={() => updateWatchStatus(anime.mal_id, "favorite")}
                      className="text-xs bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 px-2 py-1 rounded transition"
                    >
                      ❤️
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const hasAny = watched.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Anime List</h1>
          <p className="text-gray-400">
            Total anime tracked: <span className="text-purple-400 font-semibold">{watched.length}</span>
          </p>
        </div>

        {!hasAny ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Your list is empty
            </h2>
            <p className="text-gray-400 mb-6">
              Start adding anime to track what you're watching!
            </p>
            <button
              onClick={() => navigate("/genres")}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Browse Anime
            </button>
          </div>
        ) : (
          <div>
            {renderAnimeList(favorites, "❤️ Favorites")}
            {renderAnimeList(watching, "📺 Currently Watching")}
            {renderAnimeList(completed, "✅ Watched")}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchHistory;
