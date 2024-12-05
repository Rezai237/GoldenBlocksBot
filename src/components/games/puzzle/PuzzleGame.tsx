import React from 'react';
import { usePuzzleGame } from '../../../hooks/usePuzzleGame';
import { useAchievementNotification } from '../../../hooks/useAchievementNotification';
import GameLayout from '../GameLayout';
import PuzzleGrid from './board/PuzzleGrid';
import DifficultySelector from './controls/DifficultySelector';
import GameProgress from '../GameProgress';
import AchievementUnlock from '../AchievementUnlock';

const PuzzleGame: React.FC = () => {
  const {
    config,
    setConfig,
    gameState,
    tiles,
    initializeGame,
    startGame,
    handleTileClick
  } = usePuzzleGame({
    difficulty: 'easy',
    gridSize: 3,
    timeLimit: 180
  });

  const { unlockedAchievement, clearAchievement } = useAchievementNotification();

  React.useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return (
    <>
      <GameLayout
        title="Sliding Puzzle"
        gameType="puzzle"
        gameState={gameState}
        config={config}
        onConfigChange={setConfig}
        onStart={startGame}
        onReset={initializeGame}
      >
        {gameState.status === 'idle' && (
          <DifficultySelector
            config={config}
            onChange={setConfig}
          />
        )}

        {gameState.status === 'playing' && (
          <GameProgress
            score={gameState.score.points}
            maxScore={5000}
            moves={gameState.moves}
            startTime={gameState.startTime}
            showScore={false}
          />
        )}

        <PuzzleGrid
          tiles={tiles}
          onTileClick={handleTileClick}
          disabled={gameState.status !== 'playing'}
          gridSize={config.gridSize}
        />
      </GameLayout>

      {unlockedAchievement && (
        <AchievementUnlock
          achievement={unlockedAchievement}
          onClose={clearAchievement}
        />
      )}
    </>
  );
};

export default PuzzleGame;