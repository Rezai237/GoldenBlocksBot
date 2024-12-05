import { DailyReward, RewardStreak } from '../../../types/rewards';

export const calculateRewardPoints = (day: number, streak: RewardStreak): number => {
  const basePoints = 100;
  const streakMultiplier = 1 + Math.min(streak.current * 0.1, 1);
  const maintainedMultiplier = 1 + (streak.maintainedDays * 0.05);
  const dayMultiplier = 1 + (day * 0.1);

  const milestoneMultipliers = {
    5: 1.5,
    10: 2.0,
    15: 3.0
  };

  const dayBonus = milestoneMultipliers[day as keyof typeof milestoneMultipliers] || dayMultiplier;
  return Math.round(basePoints * dayBonus * streakMultiplier * maintainedMultiplier);
};

export const calculateRewardTokens = (day: number, streak: RewardStreak): number => {
  const baseTokens = 0.1;
  const streakBonus = Math.min(streak.current * 0.05, 0.5);
  const maintainedBonus = streak.maintainedDays * 0.02;
  const dayBonus = day * 0.05;

  const total = baseTokens * (1 + dayBonus + streakBonus + maintainedBonus);
  return Number(total.toFixed(3));
};

export const createDailyReward = (day: number, streak: RewardStreak): DailyReward => {
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;

  return {
    id: `reward_${now}_${day}`,
    day,
    points: calculateRewardPoints(day, streak),
    tokens: calculateRewardTokens(day, streak),
    claimed: false,
    availableAt: now + ((day - 1) * oneDayMs),
    expiresAt: now + (day * oneDayMs),
    isMilestone: day === 5 || day === 10 || day === 15
  };
};

export const createInitialRewards = (streak: RewardStreak): DailyReward[] => {
  return Array.from({ length: 15 }, (_, i) => createDailyReward(i + 1, streak));
};