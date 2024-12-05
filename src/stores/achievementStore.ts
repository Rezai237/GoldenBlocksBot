import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Achievement } from '../types/achievement';
import { createGameAchievements } from '../utils/achievements';

interface AchievementState {
  achievements: Record<string, Achievement>;
  updateProgress: (achievementId: string, progress: number) => void;
  unlockAchievement: (achievementId: string) => void;
  resetProgress: () => void;
  getAchievements: () => Achievement[];
}

const createInitialAchievements = () => {
  const puzzleAchievements = createGameAchievements('puzzle');
  const achievements: Record<string, Achievement> = {};
  
  puzzleAchievements.forEach(achievement => {
    achievements[achievement.id] = {
      ...achievement,
      progress: 0,
      isUnlocked: false
    };
  });
  
  return achievements;
};

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      achievements: createInitialAchievements(),

      getAchievements: () => {
        return Object.values(get().achievements).sort((a, b) => {
          if (a.isUnlocked !== b.isUnlocked) {
            return b.isUnlocked ? 1 : -1;
          }
          const tierOrder: Record<string, number> = { gold: 3, silver: 2, bronze: 1 };
          return (tierOrder[b.tier] || 0) - (tierOrder[a.tier] || 0);
        });
      },

      updateProgress: (achievementId: string, progress: number) => {
        set((state) => {
          const achievement = state.achievements[achievementId];
          if (!achievement || achievement.isUnlocked) return state;

          const newProgress = Math.min(Math.max(0, progress), achievement.target);
          const isUnlocked = newProgress >= achievement.target;

          const updatedAchievement = {
            ...achievement,
            progress: newProgress,
            isUnlocked
          };

          if (isUnlocked) {
            const event = new CustomEvent('achievementUnlocked', {
              detail: updatedAchievement
            });
            window.dispatchEvent(event);
          }

          return {
            achievements: {
              ...state.achievements,
              [achievementId]: updatedAchievement
            }
          };
        });
      },

      unlockAchievement: (achievementId: string) => {
        set((state) => {
          const achievement = state.achievements[achievementId];
          if (!achievement || achievement.isUnlocked) return state;

          const updatedAchievement = {
            ...achievement,
            progress: achievement.target,
            isUnlocked: true
          };

          const event = new CustomEvent('achievementUnlocked', {
            detail: updatedAchievement
          });
          window.dispatchEvent(event);

          return {
            achievements: {
              ...state.achievements,
              [achievementId]: updatedAchievement
            }
          };
        });
      },

      resetProgress: () => {
        set({ achievements: createInitialAchievements() });
      }
    }),
    {
      name: 'achievement-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({
        achievements: state.achievements
      })
    }
  )
);
