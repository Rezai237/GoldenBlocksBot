import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RewardState, initialState } from './types';
import { createInitialRewards } from './utils';
import { createJSONStorage } from '../../utils/storage';

export const useRewardStore = create<RewardState>()(
  persist(
    (set, get) => ({
      ...initialState,

      initializeDailyRewards: () => {
        const { streak } = get();
        const rewards = createInitialRewards(streak);
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
              maintainedDays,
              current: state.streak.current + 1,
              longest: Math.max(state.streak.longest, state.streak.current + 1),
              lastClaimDate: Date.now()
            };

            return {
              rewards: createInitialRewards(newStreak),
              streak: newStreak,
              lastUpdated: Date.now()
            };
          }

          // Update streak for normal claims
          const newStreak = {
            ...state.streak,
            current: state.streak.current + 1,
            longest: Math.max(state.streak.longest, state.streak.current + 1),
            lastClaimDate: Date.now()
          };

          return {
            rewards: newRewards,
            streak: newStreak,
            lastUpdated: Date.now()
          };
        });

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
            current: 0,
            longest: state.streak.longest,
            lastClaimDate: 0,
            maintainedDays: 0
          }
        }));
      },

      resetStore: () => {
        set({
          rewards: [],
          streak: {
            current: 0,
            longest: 0,
            lastClaimDate: 0,
            maintainedDays: 0
          },
          lastUpdated: Date.now()
        });
      }
    }),
    {
      name: 'reward-storage',
      storage: createJSONStorage(() => localStorage),
      version: 2,
      partialize: (state) => ({
        rewards: state.rewards,
        streak: state.streak,
        lastUpdated: state.lastUpdated
      }),
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...initialState,
            rewards: [],
            streak: {
              current: 0,
              longest: 0,
              lastClaimDate: 0,
              maintainedDays: 0
            },
            lastUpdated: Date.now()
          };
        }
        if (version === 1) {
          return {
            ...persistedState,
            rewards: persistedState.rewards || [],
            streak: {
              ...initialState.streak,
              ...persistedState.streak
            },
            lastUpdated: persistedState.lastUpdated || Date.now()
          };
        }
        return persistedState;
      }
    }
  )
);