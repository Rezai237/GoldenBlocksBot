import { GameType } from './game';

export interface PlayerStats {
  totalGames: number;
  totalScore: number;
  averageScore: number;
  bestScore: number;
  achievements: number;
  lastPlayed: number;
}

export interface GameHistory {
  type: GameType;
  score: number;
  date: number;
}

export interface PlayerProfile {
  id: string;
  username: string;
  stats: PlayerStats;
  history: GameHistory[];
  achievements: string[];
  preferences: {
    theme: string;
    notifications: boolean;
  };
}

export interface PlayerRank {
  rank: number;
  score: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}
