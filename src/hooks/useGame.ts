import { useState, useCallback, useEffect } from 'react';
import { GameConfig, GameState, GameType } from '../types/game';
import { useGameStore } from '../stores/gameStore';
import { useAchievementStore } from '../stores/achievementStore';
import { calculateGameScore } from '../utils/scoring';
import { hapticFeedback } from '../utils/telegram';

interface UseGameProps {
  type: GameType;
  initialConfig: GameConfig;
}

export const useGame = ({ type, initialConfig }: UseGameProps) => {
  const { addGameRecord } = useGameStore();
  const { updateProgress } = useAchievementStore();
  
  const [config, setConfig] = useState<GameConfig>(initialConfig);
  const [gameState, setGameState] = useState<GameState>({
    status: 'idle',
    startTime: 0,
    moves: 0,
    score: {
      points: 0,
      moves: 0,
      time: 0,
      perfect: true,
      streak: 0
    }
  });

  // Update game time while playing
  useEffect(() => {
    if (gameState.status === 'playing') {
      const timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          score: {
            ...prev.score,
            time: Math.floor((Date.now() - prev.startTime) / 1000)
          }
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState.status, gameState.startTime]);

  const startGame = useCallback(() => {
    hapticFeedback.impact('light');
    setGameState({
      status: 'playing',
      startTime: Date.now(),
      moves: 0,
      score: {
        points: 0,
        moves: 0,
        time: 0,
        perfect: true,
        streak: 0
      }
    });
  }, []);

  const completeGame = useCallback((params: {
    moves: number;
    time: number;
    perfect: boolean;
    streak?: number;
  }) => {
    const score = calculateGameScore({
      gameType: type,
      difficulty: config.difficulty,
      ...params
    });

    // Add game record
    addGameRecord({
      type,
      score: {
        points: score,
        ...params
      }
    });

    setGameState(prev => ({
      ...prev,
      status: 'completed',
      endTime: Date.now(),
      score: {
        points: score,
        ...params
      }
    }));

    hapticFeedback.notification('success');
  }, [type, config.difficulty, addGameRecord]);

  const incrementMoves = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      moves: prev.moves + 1
    }));
  }, []);

  return {
    config,
    setConfig,
    gameState,
    startGame,
    completeGame,
    incrementMoves
  };
};