import { useEffect, useState } from "react";
import type { Genre } from "../types";
import { getAllGenres } from "../services/api";

interface GenreFilterProps {
  selectedGenre: number | null;
  onGenreSelect: (genreId: number | null) => void;
  isLoading?: boolean;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({
  selectedGenre,
  onGenreSelect,
  isLoading,
}) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const data = await getAllGenres();
        // Sort by count and limit to top genres
        setGenres(data.sort((a, b) => b.count - a.count).slice(0, 16));
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-white mb-4">
        Filter by Genre
      </h3>

      {loading || isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="h-10 bg-slate-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <button
            onClick={() => onGenreSelect(null)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedGenre === null
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                : "bg-slate-700 text-gray-300 hover:bg-slate-600"
            }`}
          >
            All Genres
          </button>

          {genres.map((genre) => (
            <button
              key={genre.mal_id}
              onClick={() => onGenreSelect(genre.mal_id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all truncate ${
                selectedGenre === genre.mal_id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-slate-700 text-gray-300 hover:bg-slate-600"
              }`}
              title={genre.name}
            >
              {genre.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreFilter;
