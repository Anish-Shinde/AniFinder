import { useEffect, useState } from "react";
import type { Anime } from "../types";
import { getAnimeByGenre, getTrendingAnime } from "../services/api";
import { AnimeCard } from "../components/AnimeCard";
import { GenreFilter } from "../components/GenreFilter";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PaginationControls } from "../components/PaginationControls";

export const GenrePage: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGenre]);

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
        let data: Anime[] = [];
        if (selectedGenre) {
          data = await getAnimeByGenre(selectedGenre, currentPage);
        } else {
          data = await getTrendingAnime(currentPage);
        }
        setAnimeList(data || []);
        setHasNextPage((data && data.length === 25) || false);
      } catch (error) {
        console.error("Failed to fetch anime:", error);
        setAnimeList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [selectedGenre, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && currentPage === 1) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Browse Anime by Genre
          </h1>
          <p className="text-gray-400">
            Explore thousands of anime across different genres
          </p>
        </div>

        {/* Genre Filter */}
        <div className="mb-12 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
          <GenreFilter
            selectedGenre={selectedGenre}
            onGenreSelect={setSelectedGenre}
            isLoading={loading && currentPage === 1}
          />
        </div>

        {/* Anime Grid */}
        {loading && currentPage === 1 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-700 rounded-lg h-96 animate-pulse"
              />
            ))}
          </div>
        ) : animeList.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">
              No anime found. Try a different genre!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
              {animeList.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>

            {/* Pagination */}
            <PaginationControls
              currentPage={currentPage}
              hasNextPage={hasNextPage}
              onPageChange={handlePageChange}
              isLoading={loading}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default GenrePage;
