import { Achievement } from '../../types/achievement';
import { createGameAchievements } from '../../utils/achievements';

export const createInitialAchievements = (): Record<string, Achievement> => {
  console.log('Creating initial achievements...');
  try {
    const achievements = createGameAchievements('puzzle');
    const achievementsMap: Record<string, Achievement> = {};

    achievements.forEach(achievement => {
      achievementsMap[achievement.id] = achievement;
    });

    console.log('Initial achievements created:', achievementsMap);
    return achievementsMap;
  } catch (error) {
    console.error('Error creating initial achievements:', error);
    return {};
  }
};

export const calculateAchievementPoints = (achievements: Achievement[]): number => {
  return achievements.reduce((total, achievement) => {
    return total + (achievement.isUnlocked ? achievement.points : 0);
  }, 0);
};

export const getUnlockedAchievements = (achievements: Achievement[]): Achievement[] => {
  return achievements.filter(achievement => achievement.isUnlocked);
};

export const getLockedAchievements = (achievements: Achievement[]): Achievement[] => {
  return achievements.filter(achievement => !achievement.isUnlocked);
};

export const getAchievementProgress = (achievement: Achievement): number => {
  return Math.min(1, achievement.progress / achievement.target) * 100;
};

export const formatAchievementProgress = (achievement: Achievement): string => {
  if (achievement.isUnlocked) return 'Completed!';
  return `${achievement.progress}/${achievement.target}`;
};
