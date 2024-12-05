import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DailyReward, RewardStreak } from '../types/rewards';
import { createDailyReward } from '../utils/rewards';

interface RewardState {
  rewards: DailyReward[];
  streak: RewardStreak;
  lastUpdated: number;
  // Actions
  initializeDailyRewards: () => void;
  claimDailyReward: () => DailyReward | null;
  getAvailableReward: () => DailyReward | null;
  updateStreak: () => void;
  resetStreak: () => void;
  resetStore: () => void;
}

const initialStreak: RewardStreak = {
  current: 0,
  longest: 0,
  lastClaimDate: 0,
  maintainedDays: 0
};

export const useRewardStore = create<RewardState>()(
  persist(
    (set, get) => ({
      rewards: [],
      streak: initialStreak,
      lastUpdated: Date.now(),

      initializeDailyRewards: () => {
        const { streak } = get();
        const rewards = Array.from({ length: 15 }, (_, i) => 
          createDailyReward(i + 1, streak)
        );
        set({ rewards, lastUpdated: Date.now() });
      },

      claimDailyReward: () => {
        const availableReward = get().getAvailableReward();
        if (!availableReward) return null;

        set(state => {
          const newRewards = state.rewards.map(reward =>
            reward.id === availableReward.id
              ? { ...reward, claimed: true }
              : reward
          );

          // If all rewards are claimed, reset and maintain streak bonus
          if (newRewards.every(r => r.claimed)) {
            const maintainedDays = state.streak.maintainedDays + 1;
            const newStreak = {
              ...state.streak,
              maintainedDays
            };

            return {
              rewards: Array.from({ length: 15 }, (_, i) => 
                createDailyReward(i + 1, newStreak)
              ),
              streak: newStreak,
              lastUpdated: Date.now()
            };
          }

          return {
            rewards: newRewards,
            lastUpdated: Date.now()
          };
        });

        get().updateStreak();
        return availableReward;
      },

      getAvailableReward: () => {
        const { rewards } = get();
        const now = Date.now();
        return rewards.find(r => 
          !r.claimed && 
          now >= r.availableAt && 
          now <= r.expiresAt
        ) || null;
      },

      updateStreak: () => {
        set(state => {
          const now = Date.now();
          const oneDayMs = 24 * 60 * 60 * 1000;
          const daysSinceLastClaim = Math.floor((now - state.streak.lastClaimDate) / oneDayMs);

          if (daysSinceLastClaim <= 1) {
            const newCurrent = state.streak.current + 1;
            return {
              streak: {
                ...state.streak,
                current: newCurrent,
                longest: Math.max(newCurrent, state.streak.longest),
                lastClaimDate: now
              }
            };
          }

          return {
            streak: {
              ...state.streak,
              current: 1,
              lastClaimDate: now
            }
          };
        });
      },

      resetStreak: () => {
        set(state => ({
          streak: {
            ...initialStreak,
            longest: state.streak.longest
          }
        }));
      },

      resetStore: () => {
        set({
          rewards: [],
          streak: initialStreak,
          lastUpdated: Date.now()
        });
      }
    }),
    {
      name: 'reward-storage',
      partialize: (state) => ({
        rewards: state.rewards,
        streak: state.streak,
        lastUpdated: state.lastUpdated
      })
    }
  )
);
