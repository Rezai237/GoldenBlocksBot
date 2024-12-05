import { GameType } from '../../types/game';
import { PlayerStats, GameHistory } from '../../types/player';

export interface PlayerActivity {
  id: string;
  type: GameType;
  score: {
    points: number;
    moves: number;
    time: number;
    perfect: boolean;
    streak?: number;
  };
  config: {
    difficulty: string;
    gridSize: number;
  };
  timestamp: number;
  tokenEarned: number;
}

export interface PlayerState {
  activities: PlayerActivity[];
  stats: PlayerStats;
  history: GameHistory[];
  lastActive: number;
}

export interface PlayerActions {
  addActivity: (activity: Omit<PlayerActivity, 'id' | 'timestamp' | 'tokenEarned'>) => void;
  updateStats: () => void;
  getRecentActivities: (limit?: number) => PlayerActivity[];
}

export type PlayerStore = PlayerState & PlayerActions;

// Create a default stats object
const defaultStats: PlayerStats = {
  totalGames: 0,
  totalScore: 0,
  averageScore: 0,
  bestScore: 0,
  achievements: 0,
  lastPlayed: Date.now()
};

// Create the initial state with default values
export const initialState: PlayerState = {
  activities: [],
  history: [],
  stats: defaultStats,
  lastActive: Date.now()
};
