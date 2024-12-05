import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Target } from 'lucide-react';
import { GameStats } from '../../types/admin';
import { formatScore } from '../../utils/scoring';

interface Props {
  stats: GameStats[];
}

const AdminGameAnalytics: React.FC<Props> = ({ stats }) => {
  return (
    <div className="glass-panel p-4 mb-6">
      <h2 className="text-lg font-bold mb-4">Game Performance</h2>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-3"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Trophy className="text-yellow-400" size={20} />
                <span className="font-semibold capitalize">{stat.type}</span>
              </div>
              <div className="text-sm text-gray-400">
                {stat.totalPlays} plays
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Average Score</span>
                  <span>{formatScore(stat.averageScore)}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full mt-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.averageScore / 10000) * 100}%` }}
                    className="h-full bg-yellow-400 rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Completion Rate</span>
                  <span>{(stat.completionRate * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full mt-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.completionRate * 100}%` }}
                    className="h-full bg-green-400 rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Average Time</span>
                  <span>{Math.round(stat.averageTime / 60)}m</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full mt-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.averageTime / 300) * 100}%` }}
                    className="h-full bg-blue-400 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminGameAnalytics;