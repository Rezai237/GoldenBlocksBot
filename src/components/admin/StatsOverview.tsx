import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Clock, Coins } from 'lucide-react';
import { useAdminStore } from '../../stores/adminStore';
import { formatDistanceToNow } from 'date-fns';

const StatsOverview = () => {
  const { stats } = useAdminStore();

  const statItems = [
    {
      icon: Users,
      label: 'Active Users',
      value: stats.activeUsers.toString(),
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: Trophy,
      label: 'Games Played',
      value: stats.totalGamesPlayed.toString(),
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Coins,
      label: 'Tokens Awarded',
      value: stats.totalTokensAwarded.toFixed(2),
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Clock,
      label: 'Avg. Play Time',
      value: `${Math.round(stats.averagePlayTime / 60)}m`,
      color: 'from-pink-400 to-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-panel p-4 relative overflow-hidden"
        >
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`}
            animate={{
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="relative">
            <item.icon className="w-6 h-6 mb-2" />
            <div className="font-bold text-lg">{item.value}</div>
            <div className="text-sm text-gray-400">{item.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsOverview;