import { create } from 'zustand';
import { AdminStats, UserActivity, GameStats } from '../types/admin';
import { usePlayerStore } from './playerStore';
import { useSponsorStore } from './sponsorStore';

interface AdminState {
  stats: AdminStats;
  userActivities: UserActivity[];
  gameStats: GameStats[];
  // Actions
  refreshStats: () => void;
  getUserActivities: (limit?: number) => UserActivity[];
  getGameStats: () => GameStats[];
}

export const useAdminStore = create<AdminState>((set, get) => ({
  stats: {
    totalUsers: 0,
    activeUsers: 0,
    totalGamesPlayed: 0,
    totalTokensAwarded: 0,
    averagePlayTime: 0
  },
  userActivities: [],
  gameStats: [],

  refreshStats: () => {
    const playerStore = usePlayerStore.getState();
    const sponsorStore = useSponsorStore.getState();

    // Calculate stats from player and sponsor stores
    const stats = {
      totalUsers: playerStore.stats.gamesPlayed,
      activeUsers: playerStore.activities.length,
      totalGamesPlayed: playerStore.stats.gamesPlayed,
      totalTokensAwarded: playerStore.stats.totalTokens,
      averagePlayTime: playerStore.stats.totalPlayTime / playerStore.stats.gamesPlayed || 0
    };

    set({ stats });
  },

  getUserActivities: (limit = 50) => {
    const { userActivities } = get();
    return userActivities.slice(0, limit);
  },

  getGameStats: () => {
    const { gameStats } = get();
    return gameStats;
  }
}));