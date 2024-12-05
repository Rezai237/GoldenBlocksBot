export type AchievementTier = 'bronze' | 'silver' | 'gold';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier: AchievementTier;
  points: number;
  target: number;
  progress: number;
  isUnlocked: boolean;
}

export interface AchievementProgress {
  current: number;
  target: number;
  percentage: number;
}

export interface AchievementUnlock {
  achievement: Achievement;
  timestamp: number;
}
