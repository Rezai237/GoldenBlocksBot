import React from 'react';
import { Trophy } from 'lucide-react';
import { formatScore } from '../../../utils/scoring';

interface Props {
  points: number;
}

const ScoreHeader: React.FC<Props> = ({ points }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <Trophy className="text-yellow-400" size={24} />
        <div>
          <h2 className="text-xl font-bold">Game Complete!</h2>
          <p className="text-sm text-gray-400">Great job!</p>
        </div>
      </div>
      <div className="text-2xl font-bold text-yellow-400">
        {formatScore(points)} pts
      </div>
    </div>
  );
};

export default React.memo(ScoreHeader);