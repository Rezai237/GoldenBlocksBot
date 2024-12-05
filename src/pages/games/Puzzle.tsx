import React from 'react';
import { usePuzzleGame } from '../../hooks/usePuzzleGame';
import { useAchievementNotification } from '../../hooks/useAchievementNotification';
import GameLayout from '../../components/games/GameLayout';
import PuzzleBoard from '../../components/games/puzzle/PuzzleBoard';
import GameProgress from '../../components/games/GameProgress';
import AchievementUnlock from '../../components/games/AchievementUnlock';

const Puzzle = () => {
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
        {gameState.status === 'playing' && (
          <GameProgress
            score={gameState.score.points}
            maxScore={5000}
            moves={gameState.moves}
            startTime={gameState.startTime}
            showScore={false} // Hide score here since it's shown in GameLayout
          />
        )}

        <PuzzleBoard
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

export default Puzzle;