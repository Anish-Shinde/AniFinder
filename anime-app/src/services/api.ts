import axios from "axios";
import type { Anime, Genre, ApiResponse } from "../types";

const API_BASE_URL = "https://api.jikan.moe/v4";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Fetch trending anime
export const getTrendingAnime = async (page = 1): Promise<Anime[]> => {
  try {
    const response = await api.get<ApiResponse<Anime[]>>("/anime", {
      params: {
        order_by: "score",
        sort: "desc",
        page,
        limit: 25,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching trending anime:", error);
    throw error;
  }
};

// Fetch anime by genre
export const getAnimeByGenre = async (
  genreId: number,
  page = 1
): Promise<Anime[]> => {
  try {
    const response = await api.get<ApiResponse<Anime[]>>("/anime", {
      params: {
        genres: genreId,
        page,
        limit: 25,
        order_by: "score",
        sort: "desc",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching anime for genre ${genreId}:`, error);
    throw error;
  }
};

// Fetch all genres
export const getAllGenres = async (): Promise<Genre[]> => {
  try {
    const response = await api.get<ApiResponse<Genre[]>>("/genres/anime");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

// Fetch single anime details
export const getAnimeDetails = async (mal_id: number): Promise<Anime> => {
  try {
    const response = await api.get<ApiResponse<Anime>>(
      `/anime/${mal_id}/full`
    );
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching anime details for ${mal_id}:`, error);
    throw error;
  }
};

// Search anime
export const searchAnime = async (query: string, page = 1): Promise<Anime[]> => {
  try {
    const response = await api.get<ApiResponse<Anime[]>>("/anime", {
      params: {
        query,
        page,
        limit: 25,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error searching anime:", error);
    throw error;
  }
};

// Fetch top anime
export const getTopAnime = async (
  filter = "upcoming",
  page = 1
): Promise<Anime[]> => {
  try {
    const response = await api.get<ApiResponse<Anime[]>>("/top/anime", {
      params: {
        filter,
        page,
        limit: 25,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching top anime:", error);
    throw error;
  }
};

export default api;
