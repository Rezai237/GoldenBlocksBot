import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PlayerActivity, PlayerStats } from '../types/player';
import { calculatePlayerStats, generateActivityId } from '../utils/playerCalculations';

interface PlayerState {
  activities: PlayerActivity[];
  stats: PlayerStats;
  lastActive: number;
  // Actions
  addActivity: (activity: Omit<PlayerActivity, 'id' | 'timestamp' | 'tokenEarned'>) => void;
  updateStats: () => void;
  getRecentActivities: (limit?: number) => PlayerActivity[];
}

const initialStats: PlayerStats = {
  totalScore: 0,
  totalTokens: 0,
  gamesPlayed: 0,
  bestScore: 0,
  averageScore: 0,
  totalPlayTime: 0,
  lastUpdated: Date.now()
};

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      activities: [],
      stats: initialStats,
      lastActive: Date.now(),

      addActivity: (activity) => {
        const tokenEarned = activity.score / 10000; // Base token calculation
        const newActivity: PlayerActivity = {
          id: generateActivityId(),
          timestamp: Date.now(),
          tokenEarned,
          ...activity
        };

        set((state) => {
          const newActivities = [newActivity, ...state.activities].slice(0, 50);
          const newStats = calculatePlayerStats(newActivities);
          
          return {
            activities: newActivities,
            stats: newStats,
            lastActive: Date.now()
          };
        });
      },

      updateStats: () => {
        set((state) => ({
          stats: calculatePlayerStats(state.activities)
        }));
      },

      getRecentActivities: (limit = 10) => {
        const { activities } = get();
        return activities
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, limit);
      }
    }),
    {
      name: 'player-storage',
      partialize: (state) => ({
        activities: state.activities,
        stats: state.stats,
        lastActive: state.lastActive
      })
    }
  )
);