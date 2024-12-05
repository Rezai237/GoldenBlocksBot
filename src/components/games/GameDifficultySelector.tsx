import { useCallback } from 'react';
import { Difficulty } from '../../types/game';

interface Props {
  difficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const DifficultySelector = ({ difficulty, onChange }: Props) => {
  console.log('Rendering DifficultySelector with:', difficulty);

  const handleChange = useCallback((newDifficulty: Difficulty) => {
    console.log('Changing difficulty to:', newDifficulty);
    onChange(newDifficulty);
  }, [onChange]);

  return (
    <div className="grid grid-cols-3 gap-2">
      <button
        onClick={() => handleChange('easy')}
        className={`p-4 rounded-lg font-bold transition-all ${
          difficulty === 'easy'
            ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-black'
            : 'glass-panel text-green-400'
        }`}
      >
        Easy
      </button>
      <button
        onClick={() => handleChange('medium')}
        className={`p-4 rounded-lg font-bold transition-all ${
          difficulty === 'medium'
            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
            : 'glass-panel text-yellow-400'
        }`}
      >
        Medium
      </button>
      <button
        onClick={() => handleChange('hard')}
        className={`p-4 rounded-lg font-bold transition-all ${
          difficulty === 'hard'
            ? 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
            : 'glass-panel text-red-400'
        }`}
      >
        Hard
      </button>
    </div>
  );
};

export default DifficultySelector;
