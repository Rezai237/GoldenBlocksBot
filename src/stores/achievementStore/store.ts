import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AchievementState, initialState } from './types';
import { createInitialAchievements } from './utils';
import { createJSONStorage } from '../../utils/storage';
import { Achievement } from '../../types/achievement';

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      achievements: createInitialAchievements(),

      getAchievements: () => {
        console.log('Getting achievements:', get().achievements);
        return Object.values(get().achievements).sort((a, b) => {
          if (a.isUnlocked !== b.isUnlocked) {
            return b.isUnlocked ? 1 : -1;
          }
          const tierOrder = { gold: 3, silver: 2, bronze: 1 };
          return tierOrder[b.tier] - tierOrder[a.tier];
        });
      },

      updateProgress: (achievementId, progress) => {
        console.log('Updating achievement progress:', { achievementId, progress });
        set((state) => {
          const achievement = state.achievements[achievementId];
          if (!achievement) {
            console.warn('Achievement not found:', achievementId);
            return state;
          }
          if (achievement.isUnlocked) {
            console.log('Achievement already unlocked:', achievementId);
            return state;
          }

          const newProgress = Math.min(Math.max(0, progress), achievement.target);
          const isUnlocked = newProgress >= achievement.target;

          const updatedAchievement = {
            ...achievement,
            progress: newProgress,
            isUnlocked
          };

          if (isUnlocked) {
            console.log('Achievement unlocked:', achievement.title);
            const event = new CustomEvent('achievementUnlocked', {
              detail: updatedAchievement
            });
            window.dispatchEvent(event);
          }

          const updatedState = {
            achievements: {
              ...state.achievements,
              [achievementId]: updatedAchievement
            }
          };
          console.log('Updated achievements state:', updatedState);
          return updatedState;
        });
      },

      unlockAchievement: (achievementId) => {
        console.log('Unlocking achievement:', achievementId);
        set((state) => {
          const achievement = state.achievements[achievementId];
          if (!achievement) {
            console.warn('Achievement not found:', achievementId);
            return state;
          }
          if (achievement.isUnlocked) {
            console.log('Achievement already unlocked:', achievementId);
            return state;
          }

          const updatedAchievement = {
            ...achievement,
            progress: achievement.target,
            isUnlocked: true
          };

          const event = new CustomEvent('achievementUnlocked', {
            detail: updatedAchievement
          });
          window.dispatchEvent(event);

          const updatedState = {
            achievements: {
              ...state.achievements,
              [achievementId]: updatedAchievement
            }
          };
          console.log('Updated achievements state:', updatedState);
          return updatedState;
        });
      },

      resetProgress: () => {
        console.log('Resetting achievement progress');
        const freshAchievements = createInitialAchievements();
        set({ achievements: freshAchievements });
        console.log('Achievement progress reset');
      }
    }),
    {
      name: 'achievement-storage',
      storage: createJSONStorage(() => localStorage),
      version: 3,
      partialize: (state) => ({
        achievements: state.achievements
      }),
      migrate: (persistedState: any, version: number) => {
        console.log('Migrating achievement store from version:', version);
        
        if (version < 3) {
          console.log('Migrating to version 3');
          // Get fresh achievements
          const freshAchievements = createInitialAchievements();
          
          // If there are existing achievements, merge their progress
          if (persistedState?.achievements) {
            Object.keys(freshAchievements).forEach(id => {
              const existingAchievement = persistedState.achievements[id];
              if (existingAchievement) {
                freshAchievements[id] = {
                  ...freshAchievements[id],
                  progress: existingAchievement.progress,
                  isUnlocked: existingAchievement.isUnlocked
                };
              }
            });
            console.log('Merged existing achievements:', Object.keys(freshAchievements).length);
          }
          
          return {
            achievements: freshAchievements
          };
        }
        
        return persistedState;
      }
    }
  )
);
