import { useCallback } from 'react';
import { GameState, GameConfig, Difficulty } from '../../types/game';
import DifficultySelector from './GameDifficultySelector';

interface Props {
  gameState: GameState;
  config: GameConfig;
  onConfigChange: (config: GameConfig) => void;
  onStart: () => void;
  onReset: () => void;
}

const GameControls = ({
  gameState,
  config,
  onConfigChange,
  onStart,
  onReset
}: Props) => {
  console.log('Rendering GameControls with state:', gameState.status);

  const handleDifficultyChange = useCallback((difficulty: Difficulty) => {
    console.log('Changing difficulty to:', difficulty);
    onConfigChange({
      ...config,
      difficulty,
      gridSize: difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5
    });
  }, [config, onConfigChange]);

  const handleStart = useCallback(() => {
    console.log('Starting game...');
    onStart();
  }, [onStart]);

  const handleReset = useCallback(() => {
    console.log('Resetting game...');
    onReset();
  }, [onReset]);

  if (gameState.status === 'idle') {
    return (
      <div className="space-y-4">
        <DifficultySelector
          difficulty={config.difficulty}
          onChange={handleDifficultyChange}
        />
        <button
          onClick={handleStart}
          className="w-full p-4 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold active:scale-98"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameState.status === 'playing') {
    return (
      <button
        onClick={handleReset}
        className="w-full p-4 rounded-lg bg-gradient-to-br from-red-400 to-pink-500 text-white font-bold active:scale-98"
      >
        Reset Game
      </button>
    );
  }

  if (gameState.status === 'paused') {
    return (
      <button
        onClick={handleStart}
        className="w-full p-4 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold active:scale-98"
      >
        Resume Game
      </button>
    );
  }

  return null;
};

export default GameControls;
