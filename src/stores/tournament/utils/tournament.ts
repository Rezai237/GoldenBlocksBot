import { Tournament } from '../../../types/tournament';
import { DEFAULT_REWARDS, DEFAULT_STATS } from '../constants';

export const createWeeklyTournament = (): Tournament => {
  const now = Date.now();
  const weekInMs = 7 * 24 * 60 * 60 * 1000;

  return {
    id: `tournament_${now}`,
    title: 'Weekly Tournament',
    description: 'Compete for massive rewards',
    startTime: now,
    endTime: now + weekInMs,
    players: [],
    rewards: DEFAULT_REWARDS,
    stats: { ...DEFAULT_STATS },
    isActive: true,
    minPlayersRequired: 0
  };
};

export const createEndedTournament = (tournament: Tournament): Tournament => {
  return {
    ...tournament,
    isActive: false,
    endTime: Date.now()
  };
};

export const calculateUpdatedStats = (players: Tournament['players']) => {
  const scores = players.map(p => p.score);
  return {
    totalParticipants: players.length,
    topScore: Math.max(...scores, 0),
    averageScore: scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0,
    completionRate: 0 // Can be calculated based on your requirements
  };
};