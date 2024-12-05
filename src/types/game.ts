export type GameType = 'puzzle';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameConfig {
  difficulty: Difficulty;
  gridSize: number;
  timeLimit?: number;
  maxMoves?: number;
}

export interface GameScore {
  points: number;
  moves: number;
  time: number;
  perfect: boolean;
  streak?: number;
  undoUsed?: boolean;
  multipliers?: {
    difficulty: number;
    moves: number;
    time: number;
    streak: number;
    mistakes: number;
    perfect: number;
  };
  breakdown?: {
    base: number;
    difficulty: number;
    timeBonus: number;
    streakBonus: number;
    mistakePenalty: number;
    perfectBonus: number;
  };
}

export interface GameState {
  status: 'idle' | 'playing' | 'paused' | 'completed';
  startTime: number;
  endTime?: number;
  moves: number;
  score: GameScore;
}

export interface PuzzleState {
  tiles: number[];
  emptyIndex: number;
  gridSize: number;
}
