import { DailyReward, RewardStreak } from '../../types/rewards';

export interface RewardState {
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

export const initialState: RewardState = {
  rewards: [],
  streak: {
    current: 0,
    longest: 0,
    lastClaimDate: 0,
    maintainedDays: 0
  },
  lastUpdated: Date.now()
};