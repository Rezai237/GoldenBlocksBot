import { GameScore, Difficulty } from '../types/game';

const BASE_SCORES = {
  puzzle: {
    easy: 1000,
    medium: 2000,
    hard: 3000
  }
};

const DIFFICULTY_MULTIPLIERS = {
  easy: 1,
  medium: 1.5,
  hard: 2
};

const TIME_BONUS_THRESHOLD = 60; // seconds
const PERFECT_BONUS = 1000;
const STREAK_MULTIPLIER = 0.1;

export const formatScore = (score: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 0
  }).format(score);
};

export const calculateScore = (
  gameType: 'puzzle',
  difficulty: Difficulty,
  moves: number,
  time: number,
  perfect: boolean = false,
  streak: number = 0
): GameScore => {
  const baseScore = BASE_SCORES[gameType][difficulty];
  const difficultyMultiplier = DIFFICULTY_MULTIPLIERS[difficulty];
  
  // Calculate time bonus
  const timeBonus = Math.max(0, TIME_BONUS_THRESHOLD - time) * 10;
  
  // Calculate move efficiency
  const moveEfficiency = Math.max(0.5, 1 - (moves / 50));
  
  // Calculate streak bonus
  const streakBonus = streak * STREAK_MULTIPLIER * baseScore;
  
  // Calculate perfect game bonus
  const perfectBonus = perfect ? PERFECT_BONUS : 0;
  
  // Calculate final score
  const points = Math.round(
    (baseScore * difficultyMultiplier * moveEfficiency) +
    timeBonus +
    streakBonus +
    perfectBonus
  );

  return {
    points,
    moves,
    time,
    perfect,
    streak,
    multipliers: {
      difficulty: difficultyMultiplier,
      moves: moveEfficiency,
      time: 1 + (timeBonus / baseScore),
      streak: 1 + (streak * STREAK_MULTIPLIER),
      mistakes: perfect ? 1 : 0.8,
      perfect: perfect ? 1.2 : 1
    },
    breakdown: {
      base: baseScore,
      difficulty: Math.round(baseScore * (difficultyMultiplier - 1)),
      timeBonus,
      streakBonus: Math.round(streakBonus),
      mistakePenalty: perfect ? 0 : -200,
      perfectBonus
    }
  };
};
