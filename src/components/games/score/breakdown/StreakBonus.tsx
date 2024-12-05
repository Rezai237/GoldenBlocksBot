import React from 'react';
import { Zap } from 'lucide-react';

interface Props {
  streak: number;
}

const StreakBonus: React.FC<Props> = ({ streak }) => {
  if (!streak || streak <= 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-gray-800">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">Max Streak</span>
        <div className="flex items-center space-x-1 text-yellow-400">
          <Zap size={16} />
          <span>{streak}x</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(StreakBonus);