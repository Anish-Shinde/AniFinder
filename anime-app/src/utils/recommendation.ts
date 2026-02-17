import type { WatchedAnime, Anime } from "../types";

interface GenreFrequency {
  mal_id: number;
  name: string;
  count: number;
}

/**
 * Calculate the most watched genres from watch history
 * Returns genres sorted by frequency
 */
export const calculateGenreFrequency = (
  watchedAnime: WatchedAnime[]
): GenreFrequency[] => {
  const genreMap = new Map<number, { name: string; count: number }>();

  watchedAnime.forEach((anime) => {
    anime.genres.forEach((genre) => {
      const existing = genreMap.get(genre.mal_id) || {
        name: genre.name,
        count: 0,
      };
      existing.count += 1;
      genreMap.set(genre.mal_id, existing);
    });
  });

  return Array.from(genreMap.entries())
    .map(([mal_id, data]) => ({
      mal_id,
      name: data.name,
      count: data.count,
    }))
    .sort((a, b) => b.count - a.count);
};

/**
 * Get top N genres from watch history
 */
export const getTopGenres = (
  watchedAnime: WatchedAnime[],
  topN = 2
): GenreFrequency[] => {
  const genres = calculateGenreFrequency(watchedAnime);
  return genres.slice(0, topN);
};

/**
 * Filter out already watched anime from recommendations
 */
export const filterWatchedAnime = (
  recommendations: Anime[],
  watched: WatchedAnime[]
): Anime[] => {
  const watchedIds = new Set(watched.map((a) => a.mal_id));
  return recommendations.filter((anime) => !watchedIds.has(anime.mal_id));
};

/**
 * Score anime recommendations based on genre match and rating
 */
export const scoreRecommendations = (
  anime: Anime[],
  preferredGenres: GenreFrequency[]
): Array<{ anime: Anime; score: number }> => {
  const genreScores = new Map(
    preferredGenres.map((g, idx) => [g.mal_id, preferredGenres.length - idx])
  );

  return anime
    .map((a) => {
      let genreScore = 0;
      a.genres.forEach((genre) => {
        genreScore += genreScores.get(genre.mal_id) || 0;
      });

      // Normalize rating (0-10) as percentage
      const ratingScore = (a.score || 0) / 10;

      // Combined score: 60% genre match + 40% rating
      const totalScore = genreScore * 0.6 + ratingScore * 0.4;

      return { anime: a, score: totalScore };
    })
    .sort((a, b) => b.score - a.score);
};

/**
 * Get recommended anime based on watch history
 */
export const getRecommendedAnime = (
  candidateAnime: Anime[],
  watchHistory: WatchedAnime[],
  topGenresCount = 2
): Anime[] => {
  if (watchHistory.length === 0) {
    // No history, return top rated anime
    return candidateAnime
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 10);
  }

  const topGenres = getTopGenres(watchHistory, topGenresCount);
  const filtered = filterWatchedAnime(candidateAnime, watchHistory);
  const scored = scoreRecommendations(filtered, topGenres);

  return scored.slice(0, 12).map((item) => item.anime);
};
