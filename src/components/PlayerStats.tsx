import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Activity, AlertCircle } from 'lucide-react';
import { usePlayerStore } from '../stores/playerStore';
import { formatScore } from '../utils/scoring';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

const PlayerStats = () => {
  const playerStore = usePlayerStore();
  console.log('PlayerStats render with store:', playerStore);

  // If store is not initialized yet, show loading
  if (!playerStore) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-400">Loading stats...</div>
      </div>
    );
  }

  const { stats, lastActive } = playerStore;

  // Ensure stats exists and has required properties
  if (!stats || typeof stats.totalGames === 'undefined') {
    console.error('Invalid stats object:', stats);
    return (
      <div className="glass-panel p-4 text-center">
        <AlertCircle className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
        <div className="text-gray-400">Unable to load stats</div>
        {import.meta.env.DEV && (
          <pre className="mt-4 text-xs text-left text-gray-500 overflow-auto">
            {JSON.stringify({ stats }, null, 2)}
          </pre>
        )}
      </div>
    );
  }

  // Create safe stats object with fallback values
  const safeStats = {
    totalScore: stats.totalScore ?? 0,
    bestScore: stats.bestScore ?? 0,
    totalGames: stats.totalGames ?? 0,
    achievements: stats.achievements ?? 0,
    lastPlayed: stats.lastPlayed ?? lastActive ?? Date.now()
  };

  const statItems = [
    {
      icon: Trophy,
      label: 'Total Score',
      value: formatScore(safeStats.totalScore),
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Trophy,
      label: 'Best Score',
      value: formatScore(safeStats.bestScore),
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: Activity,
      label: 'Games Played',
      value: safeStats.totalGames.toString(),
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Trophy,
      label: 'Achievements',
      value: safeStats.achievements.toString(),
      color: 'from-pink-400 to-red-500'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Last Active Status */}
      <div className="glass-panel p-4">
        <div className="text-sm text-gray-400">
          Last active: {formatDistanceToNow(lastActive || Date.now(), { addSuffix: true })}
        </div>
        {safeStats.lastPlayed > 0 && (
          <div className="text-sm text-gray-400 mt-1">
            Last played: {formatDistanceToNow(safeStats.lastPlayed, { addSuffix: true })}
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-4 relative overflow-hidden"
          >
            {/* Animated Background */}
            <motion.div
              className={clsx(
                'absolute inset-0 bg-gradient-to-br opacity-10',
                item.color
              )}
              animate={{
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2
              }}
            />
            
            {/* Content */}
            <div className="relative">
              <item.icon className="w-6 h-6 mb-2 text-yellow-400" />
              <div className="font-bold text-lg">{item.value}</div>
              <div className="text-sm text-gray-400">{item.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Development Mode Debug Info */}
      {import.meta.env.DEV && (
        <div className="mt-4 p-4 glass-panel">
          <div className="text-xs font-mono text-gray-500">
            <div className="mb-1 text-yellow-400">Debug Info:</div>
            <pre className="overflow-auto">
              {JSON.stringify({ stats, safeStats, lastActive }, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerStats;
