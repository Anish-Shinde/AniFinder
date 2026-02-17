import React, { createContext, useContext, useEffect, useState } from "react";
import type { WatchedAnime } from "../types";

const STORAGE_KEY = "aniFinder_watchHistory";

interface WatchContextType {
  watched: WatchedAnime[];
  addToWatched: (anime: Omit<WatchedAnime, "addedAt">) => void;
  removeFromWatched: (mal_id: number) => void;
  updateWatchStatus: (mal_id: number, status: WatchedAnime["status"]) => void;
  isAnimeWatched: (mal_id: number) => boolean;
  getWatchedAnimeCount: () => number;
  clearWatchHistory: () => void;
}

const WatchContext = createContext<WatchContextType | undefined>(undefined);

export const WatchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [watched, setWatched] = useState<WatchedAnime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setWatched(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading watch history:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever watched changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watched));
    }
  }, [watched, isLoading]);

  const addToWatched = (
    anime: Omit<WatchedAnime, "addedAt">
  ) => {
    setWatched((prev) => {
      const exists = prev.find((a) => a.mal_id === anime.mal_id);
      if (exists) {
        return prev;
      }
      return [
        ...prev,
        {
          ...anime,
          addedAt: Date.now(),
        },
      ];
    });
  };

  const removeFromWatched = (mal_id: number) => {
    setWatched((prev) => prev.filter((a) => a.mal_id !== mal_id));
  };

  const updateWatchStatus = (
    mal_id: number,
    status: WatchedAnime["status"]
  ) => {
    setWatched((prev) =>
      prev.map((a) =>
        a.mal_id === mal_id
          ? { ...a, status }
          : a
      )
    );
  };

  const isAnimeWatched = (mal_id: number): boolean => {
    return watched.some((a) => a.mal_id === mal_id);
  };

  const getWatchedAnimeCount = (): number => {
    return watched.length;
  };

  const clearWatchHistory = () => {
    setWatched([]);
  };

  const value: WatchContextType = {
    watched,
    addToWatched,
    removeFromWatched,
    updateWatchStatus,
    isAnimeWatched,
    getWatchedAnimeCount,
    clearWatchHistory,
  };

  return (
    <WatchContext.Provider value={value}>{children}</WatchContext.Provider>
  );
};

export const useWatch = (): WatchContextType => {
  const context = useContext(WatchContext);
  if (!context) {
    throw new Error("useWatch must be used within WatchProvider");
  }
  return context;
};
