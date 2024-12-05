import { PlayerActivity, PlayerState } from './types';
import { PlayerStats, GameHistory } from '../../types/player';

export const generateActivityId = (): string => {
  return `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const calculateTokenEarned = (score: PlayerActivity['score']): number => {
  let tokens = score.points / 1000; // Base tokens from points
  
  if (score.perfect) {
    tokens *= 1.5; // 50% bonus for perfect games
  }
  
  if (score.streak && score.streak > 1) {
    tokens *= (1 + (score.streak * 0.1)); // 10% bonus per streak
  }
  
  return Number(tokens.toFixed(4));
};

export const calculatePlayerStats = (activities: PlayerActivity[]): PlayerStats => {
  console.log('Calculating player stats from activities:', activities.length);

  if (activities.length === 0) {
    console.log('No activities, returning default stats');
    return {
      totalGames: 0,
      totalScore: 0,
      averageScore: 0,
      bestScore: 0,
      achievements: 0,
      lastPlayed: Date.now()
    };
  }

  const scores = activities.map(a => a.score.points);
  const totalScore = scores.reduce((sum, score) => sum + score, 0);
  const bestScore = Math.max(...scores);
  const perfectGames = activities.filter(a => a.score.perfect).length;

  const stats = {
    totalGames: activities.length,
    totalScore,
    averageScore: Math.round(totalScore / activities.length),
    bestScore,
    achievements: perfectGames,
    lastPlayed: activities[0].timestamp // Most recent activity
  };

  console.log('Calculated stats:', stats);
  return stats;
};

export const createGameHistory = (activities: PlayerActivity[]): GameHistory[] => {
  console.log('Creating game history from activities:', activities.length);
  return activities.map(activity => ({
    type: activity.type,
    score: activity.score.points,
    date: activity.timestamp
  }));
};

export const updatePlayerState = (state: PlayerState): PlayerState => {
  console.log('Updating player state');
  
  // Calculate new stats
  const stats = calculatePlayerStats(state.activities);
  
  // Create history
  const history = createGameHistory(state.activities);

  // Create updated state
  const updatedState = {
    ...state,
    stats,
    history,
    lastActive: Date.now()
  };

  console.log('Updated state:', {
    activitiesCount: updatedState.activities.length,
    stats: updatedState.stats,
    historyCount: updatedState.history.length
  });

  return updatedState;
};
