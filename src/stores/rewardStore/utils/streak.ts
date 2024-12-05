import { RewardStreak } from '../../../types/rewards';

export const isStreakMaintained = (streak: RewardStreak): boolean => {
  if (!streak.lastClaimDate) return false;
  
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  const daysSinceLastClaim = Math.floor((now - streak.lastClaimDate) / oneDayMs);
  
  return daysSinceLastClaim <= 1;
};