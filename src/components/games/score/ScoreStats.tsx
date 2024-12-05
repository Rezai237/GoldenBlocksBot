import React from 'react';
import { Clock, Zap } from 'lucide-react';

interface Props {
  time: number;
  moves: number;
  streak?: number;
}

const ScoreStats: React.FC<Props> = ({ time, moves, streak }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2 text-gray-400">
          <Clock size={16} />
          <span>Time</span>
        </div>
        <span>{time}s</span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2 text-gray-400">
          <Zap size={16} />
          <span>Moves</span>
        </div>
        <span>{moves}</span>
      </div>

      {streak > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Best Streak</span>
          <span className="text-yellow-400">{streak}x</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(ScoreStats);