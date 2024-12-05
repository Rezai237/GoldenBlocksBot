import { DailyReward, RewardStreak } from '../types/rewards';

// Calculate reward points based on day and streak
export const calculateRewardPoints = (day: number, streak: RewardStreak): number => {
  const basePoints = 100;
  const streakMultiplier = 1 + Math.min(streak.current * 0.1, 1); // Max 100% bonus
  const maintainedMultiplier = 1 + (streak.maintainedDays * 0.05); // 5% per maintained day
  const dayMultiplier = 1 + (day * 0.1); // 10% increase per day

  // Special multipliers for milestone days
  const milestoneMultipliers = {
    5: 1.5,   // 50% bonus
    10: 2.0,  // 100% bonus
    15: 3.0   // 200% bonus
  };

  const dayBonus = milestoneMultipliers[day as keyof typeof milestoneMultipliers] || dayMultiplier;
  return Math.round(basePoints * dayBonus * streakMultiplier * maintainedMultiplier);
};

// Calculate token rewards
export const calculateRewardTokens = (day: number, streak: RewardStreak): number => {
  const baseTokens = 0.1;
  const streakBonus = Math.min(streak.current * 0.05, 0.5); // Max 50% bonus
  const maintainedBonus = streak.maintainedDays * 0.02; // 2% per maintained day
  const dayBonus = day * 0.05; // 5% increase per day

  const total = baseTokens * (1 + dayBonus + streakBonus + maintainedBonus);
  return Number(total.toFixed(3));
};

// Check if a reward is available
export const isRewardAvailable = (reward: DailyReward): boolean => {
  const now = Date.now();
  return !reward.claimed && now >= reward.availableAt && now <= reward.expiresAt;
};

// Check if streak is maintained
export const isStreakMaintained = (streak: RewardStreak): boolean => {
  if (!streak.lastClaimDate) return false;
  
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  const daysSinceLastClaim = Math.floor((now - streak.lastClaimDate) / oneDayMs);
  return daysSinceLastClaim <= 1;
};

// Create a new daily reward
export const createDailyReward = (day: number, streak: RewardStreak): DailyReward => {
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;

  // Calculate availability window
  const availableAt = now + ((day - 1) * oneDayMs);
  const expiresAt = availableAt + oneDayMs;

  return {
    id: `reward_${now}_${day}`,
    day,
    points: calculateRewardPoints(day, streak),
    tokens: calculateRewardTokens(day, streak),
    claimed: false,
    availableAt,
    expiresAt,
    isMilestone: day === 5 || day === 10 || day === 15
  };
};

// Format time until next reward
export const getTimeUntilNextReward = (reward: DailyReward): string => {
  const now = Date.now();
  
  if (now < reward.availableAt) {
    const diff = reward.availableAt - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  }
  
  if (now > reward.expiresAt) {
    return 'Expired';
  }
  
  return 'Available now';
};

// Get streak bonus description
export const getStreakBonusText = (streak: RewardStreak): string => {
  const streakBonus = Math.min(streak.current * 10, 100);
  const maintainedBonus = streak.maintainedDays * 5;
  const totalBonus = streakBonus + maintainedBonus;
  
  return `+${totalBonus}% Bonus`;
};