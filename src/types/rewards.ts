export interface DailyReward {
  id: string;
  day: number;
  points: number;
  tokens: number;
  claimed: boolean;
  availableAt: number;
  expiresAt: number;
  isMilestone: boolean;
}

export interface RewardStreak {
  current: number;
  longest: number;
  lastClaimDate: number;
  maintainedDays: number; // Days maintaining streak after day 15
}

export interface RewardState {
  rewards: DailyReward[];
  streak: RewardStreak;
  lastUpdated: number;
}