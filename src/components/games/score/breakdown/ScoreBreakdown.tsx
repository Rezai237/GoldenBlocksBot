import React from 'react';
import { Trophy, Star, Clock, Zap, X, Award } from 'lucide-react';
import { GameScore } from '../../../types/game';
import BreakdownItem from './BreakdownItem';
import StreakBonus from './StreakBonus';

interface Props {
  score: GameScore;
}

const ScoreBreakdown: React.FC<Props> = ({ score }) => {
  const items = React.useMemo(() => [
    {
      label: 'Base Score',
      value: score.breakdown?.base || 0,
      icon: Trophy,
      color: 'text-gray-400'
    },
    {
      label: 'Difficulty Bonus',
      value: score.breakdown?.difficulty || 0,
      icon: Star,
      color: 'text-blue-400'
    },
    {
      label: 'Time Bonus',
      value: score.breakdown?.timeBonus || 0,
      icon: Clock,
      color: 'text-green-400'
    },
    {
      label: 'Streak Bonus',
      value: score.breakdown?.streakBonus || 0,
      icon: Zap,
      color: 'text-yellow-400'
    },
    ...(score.breakdown?.mistakePenalty ? [{
      label: 'Mistake Penalty',
      value: -score.breakdown.mistakePenalty,
      icon: X,
      color: 'text-red-400'
    }] : []),
    ...(score.breakdown?.perfectBonus ? [{
      label: 'Perfect Bonus',
      value: score.breakdown.perfectBonus,
      icon: Award,
      color: 'text-purple-400'
    }] : [])
  ], [score.breakdown]);

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
          <BreakdownItem
            key={item.label}
            {...item}
            index={index}
          />
        ))}
      </div>

      {score.streak > 0 && (
        <StreakBonus streak={score.streak} />
      )}
    </div>
  );
};

export default React.memo(ScoreBreakdown);