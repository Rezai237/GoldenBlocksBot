import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Zap, Star, X, Award } from 'lucide-react';
import { GameScore } from '../../types/game';
import clsx from 'clsx';

interface Props {
  score: GameScore;
  showDetails?: boolean;
}

const ScoreBreakdown: React.FC<Props> = ({ score, showDetails = true }) => {
  const items = [
    {
      label: 'Base Score',
      value: score.breakdown.base,
      icon: Trophy,
      color: 'text-gray-400'
    },
    {
      label: 'Difficulty Bonus',
      value: score.breakdown.difficulty,
      icon: Star,
      color: 'text-blue-400'
    },
    {
      label: 'Time Bonus',
      value: score.breakdown.timeBonus,
      icon: Clock,
      color: 'text-green-400'
    },
    {
      label: 'Streak Bonus',
      value: score.breakdown.streakBonus,
      icon: Zap,
      color: 'text-yellow-400'
    }
  ];

  if (score.breakdown.mistakePenalty > 0) {
    items.push({
      label: 'Mistake Penalty',
      value: -score.breakdown.mistakePenalty,
      icon: X,
      color: 'text-red-400'
    });
  }

  if (score.breakdown.perfectBonus > 0) {
    items.push({
      label: 'Perfect Bonus',
      value: score.breakdown.perfectBonus,
      icon: Award,
      color: 'text-purple-400'
    });
  }

  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Score Breakdown</h3>
        <div className="text-2xl font-bold text-yellow-400">
          {score.points.toLocaleString()}
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <item.icon className={clsx('w-4 h-4', item.color)} />
              <span className="text-sm text-gray-400">{item.label}</span>
            </div>
            <span className={clsx(
              'font-medium',
              item.value >= 0 ? 'text-green-400' : 'text-red-400'
            )}>
              {item.value >= 0 ? '+' : ''}{item.value.toLocaleString()}
            </span>
          </motion.div>
        ))}
      </div>

      {score.streak > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Max Streak</span>
            <div className="flex items-center space-x-1 text-yellow-400">
              <Zap size={16} />
              <span>{score.streak}x</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreBreakdown;