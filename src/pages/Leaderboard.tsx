import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Puzzle, ChevronRight } from 'lucide-react';
import { useGameStore } from '../stores/gameStore';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

const Leaderboard = () => {
  const { getBestRecords } = useGameStore();
  const records = getBestRecords(100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20 px-4"
    >
      {/* Header */}
      <div className="glass-panel p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500">
            <Trophy size={24} className="text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Leaderboard</h1>
            <p className="text-gray-400">Top 100 Players</p>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {records.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="glass-panel p-4 relative overflow-hidden"
          >
            <div className="flex items-center space-x-4">
              <div className={clsx(
                'w-8 h-8 rounded-lg flex items-center justify-center font-bold',
                index === 0 ? 'bg-yellow-400 text-black' :
                index === 1 ? 'bg-gray-300 text-black' :
                index === 2 ? 'bg-orange-400 text-black' :
                'bg-gray-700 text-gray-300'
              )}>
                {index + 1}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold truncate">
                    Player {record.id.slice(0, 8)}
                  </span>
                  {index < 3 && (
                    <Medal className={clsx(
                      'w-4 h-4',
                      index === 0 ? 'text-yellow-400' :
                      index === 1 ? 'text-gray-300' :
                      'text-orange-400'
                    )} />
                  )}
                </div>
                <div className="text-[13px] text-gray-400">
                  {formatDistanceToNow(record.date, { addSuffix: true })}
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold">
                  {record.score.points.toLocaleString()}
                </div>
                <div className="text-[13px] text-gray-400 flex items-center justify-end space-x-1">
                  <Puzzle size={14} />
                  <span>{record.type}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {records.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <Trophy className="mx-auto mb-3 text-gray-500" size={24} />
            <p className="text-gray-400">No games played yet</p>
            <p className="text-sm text-gray-500 mt-1">Start playing to see the leaderboard!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Leaderboard;