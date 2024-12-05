import { useState, useCallback } from 'react';
import { GameConfig } from '../types/game';
import { useGameState } from './useGameState';
import { generatePuzzle, isValidMove, isPuzzleSolved } from '../utils/puzzle';
import { hapticFeedback } from '../utils/telegram';
import { useAchievementStore } from '../stores/achievementStore/store';
import { usePlayerStore } from '../stores/playerStore/store';
import { useGameStore } from '../stores/gameStore';
import { updateAchievements } from '../utils/achievements';

export const usePuzzleGame = (initialConfig: GameConfig) => {
  const {
    config,
    setConfig,
    gameState,
    startGame,
    completeGame,
    incrementMoves,
    resetGame
  } = useGameState({
    gameType: 'puzzle',
    initialConfig
  });

  const achievementStore = useAchievementStore();
  const playerStore = usePlayerStore();
  const gameStore = useGameStore();
  const [tiles, setTiles] = useState<number[]>([]);
  const [emptyIndex, setEmptyIndex] = useState<number>(0);

  const initializeGame = useCallback(() => {
    console.log('Initializing new game...');
    resetGame();
    const newTiles = generatePuzzle(config);
    setTiles(newTiles);
    setEmptyIndex(newTiles.indexOf(0));
  }, [config, resetGame]);

  const handleTileClick = useCallback((index: number) => {
    if (
      gameState.status !== 'playing' ||
      !isValidMove(index, emptyIndex, config.gridSize)
    ) {
      return;
    }

    hapticFeedback.impact('light');

    // Move tile
    const newTiles = [...tiles];
    newTiles[emptyIndex] = tiles[index];
    newTiles[index] = 0;
    
    setTiles(newTiles);
    setEmptyIndex(index);
    incrementMoves();

    // Check for win
    if (isPuzzleSolved(newTiles, config.gridSize)) {
      const endTime = Date.now();
      const gameTime = (endTime - gameState.startTime) / 1000;
      
      // Complete game and get final score
      completeGame(true);

      // Wait for state update
      setTimeout(() => {
        const finalScore = {
          points: gameState.score.points,
          moves: gameState.moves + 1,
          time: gameTime,
          perfect: true,
          streak: gameState.score.streak || 0
        };

        console.log('Game completed with score:', finalScore);

        // Update achievements
        const updatedAchievements = updateAchievements(
          'puzzle',
          finalScore,
          Object.values(achievementStore.achievements)
        );

        // Update each achievement's progress
        updatedAchievements.forEach(achievement => {
          achievementStore.updateProgress(achievement.id, achievement.progress);
        });

        // Add activity to player store
        playerStore.addActivity({
          type: 'puzzle',
          score: finalScore,
          config: {
            difficulty: config.difficulty,
            gridSize: config.gridSize
          }
        });

        // Add record to game store for leaderboard
        gameStore.addGameRecord({
          type: 'puzzle',
          score: finalScore
        });

        console.log('Updated player store, game store, and achievements');
      }, 0);
    }
  }, [
    tiles,
    emptyIndex,
    config,
    gameState,
    completeGame,
    incrementMoves,
    achievementStore,
    playerStore,
    gameStore
  ]);

  return {
    config,
    setConfig,
    gameState,
    tiles,
    emptyIndex,
    initializeGame,
    startGame,
    handleTileClick
  };
};
