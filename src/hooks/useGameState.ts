import { useState, useCallback } from 'react';
import { GameType, GameState, GameConfig } from '../types/game';
import { calculateScore } from '../utils/scoring';

interface UseGameStateProps {
  gameType: GameType;
  initialConfig: GameConfig;
}

export const useGameState = ({ gameType, initialConfig }: UseGameStateProps) => {
  const [config, setConfig] = useState<GameConfig>(initialConfig);
  const [gameState, setGameState] = useState<GameState>({
    status: 'idle',
    startTime: 0,
    moves: 0,
    score: {
      points: 0,
      moves: 0,
      time: 0,
      perfect: false,
      streak: 0
    }
  });

  const startGame = useCallback(() => {
    console.log('Starting game...');
    setGameState({
      status: 'playing',
      startTime: Date.now(),
      moves: 0,
      score: {
        points: 0,
        moves: 0,
        time: 0,
        perfect: false,
        streak: 0
      }
    });
  }, []);

  const pauseGame = useCallback(() => {
    console.log('Pausing game...');
    setGameState(state => ({
      ...state,
      status: 'paused'
    }));
  }, []);

  const resumeGame = useCallback(() => {
    console.log('Resuming game...');
    setGameState(state => ({
      ...state,
      status: 'playing'
    }));
  }, []);

  const completeGame = useCallback((perfect: boolean = false) => {
    console.log('Completing game with perfect:', perfect);
    const endTime = Date.now();
    const timeElapsed = (endTime - gameState.startTime) / 1000;

    const score = calculateScore(
      gameType,
      config.difficulty,
      gameState.moves,
      timeElapsed,
      perfect,
      gameState.score.streak || 0
    );

    console.log('Calculated score:', score);

    setGameState(state => ({
      ...state,
      status: 'completed',
      endTime,
      score
    }));
  }, [gameType, config.difficulty, gameState.startTime, gameState.moves, gameState.score.streak]);

  const incrementMoves = useCallback(() => {
    setGameState(state => ({
      ...state,
      moves: state.moves + 1
    }));
  }, []);

  const resetGame = useCallback(() => {
    console.log('Resetting game...');
    setGameState({
      status: 'idle',
      startTime: 0,
      moves: 0,
      score: {
        points: 0,
        moves: 0,
        time: 0,
        perfect: false,
        streak: 0
      }
    });
  }, []);

  return {
    config,
    setConfig,
    gameState,
    startGame,
    pauseGame,
    resumeGame,
    completeGame,
    incrementMoves,
    resetGame
  };
};
