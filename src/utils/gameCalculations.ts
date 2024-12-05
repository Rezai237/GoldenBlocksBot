import { GameRecord, GameStats, GameType } from '../types/game';

export const createEmptyStats = (): GameStats => ({
  bestScore: 0,
  averageScore: 0,
  totalGames: 0,
  bestStreak: 0,
  lastUpdated: Date.now()
});

export const calculateGameStats = (records: GameRecord[], gameType: GameType): GameStats => {
  const typeRecords = records.filter(r => r.type === gameType);
  
  if (typeRecords.length === 0) {
    return createEmptyStats();
  }

  const totalScore = typeRecords.reduce((sum, r) => sum + r.score.points, 0);
  const bestStreak = Math.max(...typeRecords.map(r => r.score.streak || 0));

  return {
    bestScore: typeRecords[0].score.points,
    averageScore: Math.round(totalScore / typeRecords.length),
    totalGames: typeRecords.length,
    bestStreak,
    lastUpdated: Date.now()
  };
};

export const generateGameId = (): string => {
  return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const sortGameRecords = (records: GameRecord[]): GameRecord[] => {
  return [...records].sort((a, b) => b.score.points - a.score.points);
};