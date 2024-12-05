import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Trophy, Puzzle, Star } from 'lucide-react';
import { usePlayerStore } from '../stores/playerStore';
import { formatDistanceToNow } from 'date-fns';
import { formatScore } from '../utils/scoring';
import clsx from 'clsx';

const RecentActivities = () => {
  const { getRecentActivities } = usePlayerStore();
  const activities = getRecentActivities(5);

  if (activities.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        <Trophy className="mx-auto mb-3 text-gray-500" size={24} />
        <p className="text-gray-400">No activities yet</p>
        <p className="text-sm text-gray-500 mt-1">Start playing to earn achievements!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <motion.div
          key={activity.id}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass-panel p-4 relative overflow-hidden"
        >
          <div className="flex items-center space-x-4">
            <div className={clsx(
              'w-12 h-12 rounded-xl flex items-center justify-center',
              'bg-gradient-to-br',
              activity.type === 'puzzle' 
                ? 'from-yellow-400 to-orange-500'
                : 'from-blue-400 to-purple-500'
            )}>
              {activity.type === 'puzzle' ? (
                <Puzzle size={24} className="text-black" />
              ) : (
                <Trophy size={24} className="text-black" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="font-semibold capitalize">
                  {activity.type} Game
                </span>
                <span className="text-sm text-gray-400">
                  ({activity.config.difficulty})
                </span>
                <Clock size={14} className="text-gray-400 ml-2" />
                <span className="text-sm text-gray-400">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </span>
              </div>
              
              <div className="mt-1 flex items-center space-x-4 text-sm">
                <div>
                  <span className="text-gray-400">Score: </span>
                  <span className="font-medium">{formatScore(activity.score.points)} pts</span>
                </div>
                <div>
                  <span className="text-gray-400">Moves: </span>
                  <span className="font-medium">{activity.score.moves}</span>
                </div>
                <div>
                  <span className="text-gray-400">Time: </span>
                  <span className="font-medium">{Math.round(activity.score.time)}s</span>
                </div>
                {activity.score.perfect && (
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Star size={14} />
                    <span>Perfect!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default React.memo(RecentActivities);
