import { PlayerActivity, PlayerStats } from '../types/player';

export const calculatePlayerStats = (activities: PlayerActivity[]): PlayerStats => {
  if (activities.length === 0) {
    return {
      totalScore: 0,
      totalTokens: 0,
      gamesPlayed: 0,
      bestScore: 0,
      averageScore: 0,
      totalPlayTime: 0,
      lastUpdated: Date.now()
    };
  }

  const totalScore = activities.reduce((sum, act) => sum + act.score, 0);
  const totalTokens = activities.reduce((sum, act) => sum + act.tokenEarned, 0);
  const totalPlayTime = activities.reduce((sum, act) => sum + act.duration, 0);
  const bestScore = Math.max(...activities.map(act => act.score));

  return {
    totalScore,
    totalTokens,
    gamesPlayed: activities.length,
    bestScore,
    averageScore: Math.round(totalScore / activities.length),
    totalPlayTime,
    lastUpdated: Date.now()
  };
};

export const generateActivityId = (): string => {
  return `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const calculateTokenEarned = (score: number): number => {
  // Base token rate: 1 token per 10,000 points
  const baseTokens = score / 10000;
  
  // Apply bonus for high scores
  const bonusMultiplier = score >= 5000 ? 1.2 : 1;
  
  return Number((baseTokens * bonusMultiplier).toFixed(4));
};