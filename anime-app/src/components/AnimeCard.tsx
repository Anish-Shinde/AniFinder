import type { Anime } from "../types";
import { useNavigate } from "react-router-dom";
import { useWatch } from "../context/WatchContext";

interface AnimeCardProps {
  anime: Anime;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const navigate = useNavigate();
  const { isAnimeWatched, addToWatched } = useWatch();
  const watched = isAnimeWatched(anime.mal_id);

  const handleAddToWatched = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToWatched({
      mal_id: anime.mal_id,
      title: anime.title,
      image: anime.images.jpg.large_image_url,
      genres: anime.genres,
      status: "watching",
    });
  };

  return (
    <div
      onClick={() => navigate(`/anime/${anime.mal_id}`)}
      className="group cursor-pointer h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-slate-700 aspect-[3/4]">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-lg text-sm font-bold shadow-lg">
          ⭐ {anime.score.toFixed(1)}
        </div>

        {/* Watched Badge */}
        {watched && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
            ✓ Watched
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col h-40">
        <h3 className="font-bold text-white text-sm line-clamp-2 group-hover:text-purple-300 transition mb-1">
          {anime.title}
        </h3>

        <div className="text-xs text-gray-300 mb-2">
          <p className="flex justify-between">
            <span>Episodes: {anime.episodes || "?"}</span>
            <span>{anime.type}</span>
          </p>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-2 flex-1">
          {anime.genres.slice(0, 2).map((genre) => (
            <span
              key={genre.mal_id}
              className="text-xs bg-purple-500/30 text-purple-300 px-2 py-1 rounded border border-purple-500/50"
            >
              {genre.name}
            </span>
          ))}
          {anime.genres.length > 2 && (
            <span className="text-xs text-gray-400 px-2 py-1">
              +{anime.genres.length - 2}
            </span>
          )}
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddToWatched}
          disabled={watched}
          className={`w-full py-2 rounded text-sm font-semibold transition-all duration-200 ${
            watched
              ? "bg-green-500/30 text-green-300 cursor-default border border-green-500/50"
              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50 border border-purple-400/50"
          }`}
        >
          {watched ? "✓ Added" : "+ Add to List"}
        </button>
      </div>
    </div>
  );
};

export default AnimeCard;
