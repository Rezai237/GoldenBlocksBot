import React from 'react';
import { Settings } from 'lucide-react';
import { GameConfig } from '../../../../types/game';
import clsx from 'clsx';

interface Props {
  config: GameConfig;
  onChange: (config: GameConfig) => void;
}

const DifficultySelector: React.FC<Props> = ({ config, onChange }) => {
  const difficulties = [
    { value: 'easy', label: 'Easy', gridSize: 3 },
    { value: 'medium', label: 'Medium', gridSize: 4 },
    { value: 'hard', label: 'Hard', gridSize: 5 }
  ];

  return (
    <div className="glass-panel p-4 mb-4">
      <div className="flex items-center space-x-3 mb-4">
        <Settings className="text-yellow-400" size={20} />
        <h3 className="font-semibold">Difficulty Settings</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {difficulties.map((diff) => (
          <button
            key={diff.value}
            onClick={() => onChange({
              ...config,
              difficulty: diff.value as GameConfig['difficulty'],
              gridSize: diff.gridSize
            })}
            className={clsx(
              'py-2 px-4 rounded-lg transition-colors',
              config.difficulty === diff.value
                ? 'bg-yellow-400 text-black'
                : 'glass-panel text-gray-400'
            )}
          >
            {diff.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(DifficultySelector);