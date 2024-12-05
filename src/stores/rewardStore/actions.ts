import { StateCreator } from 'zustand';
import { RewardStore } from './types';
import { initialStreak, initialState } from './types';
import { createInitialRewards } from './utils/rewards';
import { isStreakMaintained } from './utils/streak';

export const createActions = (
  set: StateCreator<RewardStore>['setState'],
  get: () => RewardStore
) => ({
  initializeDailyRewards: () => {
    const rewards = createInitialRewards(get().streak);
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

      const allClaimed = newRewards.every(r => r.claimed);
      const newStreak = {
        ...state.streak,
        current: state.streak.current + 1,
        longest: Math.max(state.streak.longest, state.streak.current + 1),
        lastClaimDate: Date.now(),
        maintainedDays: allClaimed ? state.streak.maintainedDays + 1 : state.streak.maintainedDays
      };

      if (allClaimed) {
        return {
          rewards: createInitialRewards(newStreak),
          streak: newStreak,
          lastUpdated: Date.now()
        };
      }

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
      if (isStreakMaintained(state.streak)) {
        return {
          streak: {
            ...state.streak,
            current: state.streak.current + 1,
            longest: Math.max(state.streak.longest, state.streak.current + 1),
            lastClaimDate: Date.now()
          }
        };
      }
      return {
        streak: {
          ...state.streak,
          current: 1,
          lastClaimDate: Date.now()
        }
      };
    });
  },

  resetStreak: () => {
    set({ streak: initialStreak });
  },

  resetStore: () => {
    const freshState = {
      ...initialState,
      rewards: createInitialRewards(initialStreak)
    };
    set(freshState);
  }
});