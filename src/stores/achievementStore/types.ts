import { Achievement } from '../../types/achievement';

export interface AchievementState {
  achievements: Record<string, Achievement>;
  getAchievements: () => Achievement[];
  updateProgress: (achievementId: string, progress: number) => void;
  unlockAchievement: (achievementId: string) => void;
  resetProgress: () => void;
}

export const initialState: Pick<AchievementState, 'achievements'> = {
  achievements: {}
};