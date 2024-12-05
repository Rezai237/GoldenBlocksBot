import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Users, Award } from 'lucide-react';
import { Tournament } from '../../types/tournament';
import { formatScore } from '../../utils/scoring';
import clsx from 'clsx';

interface Props {
  tournament: Tournament;
}

const TournamentStats: React.FC<Props> = ({ tournament }) => {
  // Ensure we have valid stats with default values
  const stats = React.useMemo(() => ({
    topScore: tournament.stats?.topScore || 0,
    averageScore: tournament.stats?.averageScore || 0,
    totalParticipants: tournament.players?.length || 0,
    completionRate: tournament.stats?.completionRate || 0
  }), [tournament]);

  const statItems = [
    {
      icon: Trophy,
      label: 'Top Score',
      value: formatScore(stats.topScore),
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Target,
      label: 'Average',
      value: formatScore(stats.averageScore),
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: Users,
      label: 'Players',
      value: stats.totalParticipants.toString(),
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Award,
      label: 'Completion',
      value: `${Math.round(stats.completionRate * 100)}%`,
      color: 'from-pink-400 to-red-500'
    }
  ];

  return (
    <div className="glass-panel p-4">
      <h2 className="font-bold mb-4">Tournament Stats</h2>

      <div className="grid grid-cols-2 gap-3">
        {statItems.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-3 relative overflow-hidden"
          >
            <motion.div
              className={clsx(
                'absolute inset-0 bg-gradient-to-br opacity-10',
                stat.color
              )}
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
              <stat.icon className="w-5 h-5 mb-2 text-yellow-400" />
              <div className="font-bold text-lg">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TournamentStats;