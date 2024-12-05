import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, Coins } from 'lucide-react';
import { TournamentReward } from '../../../types/tournament';
import { formatScore } from '../../../utils/scoring';
import clsx from 'clsx';

interface Props {
  position: number;
  reward: TournamentReward;
  index: number;
}

const RewardItem: React.FC<Props> = ({ position, reward, index }) => {
  const getIcon = () => {
    switch (position) {
      case 1:
        return Crown;
      case 2:
      case 3:
        return Medal;
      default:
        return Trophy;
    }
  };

  const getLabel = () => {
    switch (position) {
      case 1:
        return { title: 'First Place', description: 'Tournament Champion' };
      case 2:
        return { title: 'Second Place', description: 'Runner-up' };
      case 3:
        return { title: 'Third Place', description: 'Bronze Medalist' };
      default:
        return { title: `${position}th Place`, description: 'Top Performer' };
    }
  };

  const getColor = () => {
    switch (position) {
      case 1:
        return 'from-yellow-400 to-orange-500';
      case 2:
        return 'from-gray-300 to-gray-400';
      case 3:
        return 'from-orange-400 to-orange-500';
      default:
        return 'from-blue-400 to-purple-500';
    }
  };

  const Icon = getIcon();
  const { title, description } = getLabel();
  const color = getColor();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-panel p-4 relative overflow-hidden"
    >
      <motion.div
        className={clsx(
          'absolute inset-0 bg-gradient-to-br opacity-10',
          color
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

      <div className="relative flex items-center space-x-4">
        <div className={clsx(
          'w-12 h-12 rounded-xl flex items-center justify-center',
          'bg-gradient-to-br',
          color
        )}>
          <Icon size={24} className="text-black" />
        </div>

        <div className="flex-1">
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-yellow-400">
            {formatScore(reward.points)}
          </div>
          <div className="flex items-center justify-end space-x-1 text-sm">
            <Coins size={14} className="text-yellow-400" />
            <span className="text-yellow-400">+{reward.tokens}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(RewardItem);