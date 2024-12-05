import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { formatScore } from '../../utils/scoring';

interface Props {
  score: number;
  maxScore: number;
  moves: number;
  startTime?: number;
  showTimer?: boolean;
  showScore?: boolean; // Add control for score display
}

const GameProgress: React.FC<Props> = ({
  score,
  maxScore,
  moves,
  startTime,
  showTimer = true,
  showScore = true // Default to true for backward compatibility
}) => {
  const progress = Math.min(1, score / maxScore) * 100;

  return (
    <div className="glass-panel p-4 mb-4">
      {showScore && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Trophy className="text-yellow-400" size={20} />
            <span className="font-bold text-lg">{formatScore(score)}</span>
          </div>
          {showTimer && startTime && (
            <div className="flex items-center space-x-2 text-gray-400">
              <Clock size={16} />
              <span className="text-sm">
                {formatDistanceToNow(startTime, { addSuffix: true })}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="space-y-2">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
          />
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Moves: {moves}</span>
          <span className="text-gray-400">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(GameProgress);