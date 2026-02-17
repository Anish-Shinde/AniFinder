// Anime data types
export interface Anime {
  mal_id: number;
  title: string;
  year?: number;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp?: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  synopsis: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  episodes: number | null;
  status: string;
  aired: {
    from: string;
    to: string | null;
  };
  genres: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  studios: Array<{
    mal_id: number;
    name: string;
    type: string;
    url: string;
  }>;
  trailer?: {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: {
      image_url: string;
      small_image_url: string;
      medium_image_url: string;
      large_image_url: string;
      maximum_image_url: string;
    };
  };
  url: string;
  rating: string;
  type: string;
  source: string;
}

export interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
  count: number;
}

export interface WatchedAnime {
  mal_id: number;
  title: string;
  image: string;
  genres: Array<{ mal_id: number; name: string }>;
  status: "watched" | "watching" | "favorite";
  addedAt: number;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}
