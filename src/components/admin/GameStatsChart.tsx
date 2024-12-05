import React from 'react';
import { motion } from 'framer-motion';
import { useAdminStore } from '../../stores/adminStore';
import { Trophy, Clock, Target } from 'lucide-react';

const GameStatsChart = () => {
  const { getGameStats } = useAdminStore();
  const stats = getGameStats();

  return (
    <div className="glass-panel p-4">
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
                  <span>{stat.averageScore.toLocaleString()}</span>
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
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GameStatsChart;