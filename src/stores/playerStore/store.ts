import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PlayerStore, initialState } from './types';
import { calculatePlayerStats, generateActivityId, calculateTokenEarned, updatePlayerState } from './utils';
import { createJSONStorage } from '../../utils/storage';

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => {
      console.log('Creating player store with initial state:', initialState);
      
      return {
        ...initialState,

        addActivity: (activity) => {
          console.log('Adding new activity:', activity);
          
          const tokenEarned = calculateTokenEarned(activity.score);
          const newActivity = {
            id: generateActivityId(),
            timestamp: Date.now(),
            tokenEarned,
            ...activity
          };

          set((state) => {
            // Add new activity and keep only most recent 50
            const newActivities = [newActivity, ...state.activities].slice(0, 50);
            
            // Update entire state
            const updatedState = updatePlayerState({
              ...state,
              activities: newActivities
            });

            console.log('Updated player state:', {
              totalGames: updatedState.stats.totalGames,
              totalScore: updatedState.stats.totalScore,
              activities: updatedState.activities.length
            });

            return updatedState;
          });
        },

        updateStats: () => {
          console.log('Manually updating player stats');
          set((state) => {
            const updatedState = updatePlayerState(state);
            console.log('Updated player stats:', updatedState.stats);
            return updatedState;
          });
        },

        getRecentActivities: (limit = 10) => {
          const { activities } = get();
          const recentActivities = activities
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, limit);
          console.log('Getting recent activities:', recentActivities.length);
          return recentActivities;
        }
      };
    },
    {
      name: 'player-storage',
      storage: createJSONStorage(() => localStorage),
      version: 3,
      partialize: (state) => ({
        activities: state.activities,
        stats: state.stats,
        history: state.history,
        lastActive: state.lastActive
      }),
      migrate: (persistedState: any, version: number) => {
        console.log('Migrating player store from version:', version);
        
        if (version < 3) {
          console.log('Migrating to version 3');
          // Start with initial state
          const newState = { ...initialState };
          
          // If there are any existing activities, keep them and recalculate stats
          if (persistedState?.activities?.length > 0) {
            newState.activities = persistedState.activities;
            const updatedState = updatePlayerState(newState);
            console.log('Migrated state with activities:', updatedState.activities.length);
            return updatedState;
          }
          
          console.log('No existing activities, using initial state');
          return newState;
        }
        
        // For version 3 and above, ensure stats are properly calculated
        const state = {
          ...initialState,
          ...persistedState,
        };
        
        return updatePlayerState(state);
      },
      onRehydrateStorage: () => (state) => {
        console.log('Rehydrated player store state:', state);
        if (state) {
          // Ensure stats are calculated after rehydration
          state.updateStats();
        }
      }
    }
  )
);
