import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, ChevronRight } from 'lucide-react';
import { TournamentPlayer } from '../../../types/tournament';
import { formatScore } from '../../../utils/scoring';
import clsx from 'clsx';

interface Props {
  player: TournamentPlayer;
  rank: number;
}

const LeaderboardItem: React.FC<Props> = ({ player, rank }) => {
  const getPlayerIcon = () => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-400" size={20} />;
      case 2:
        return <Medal className="text-gray-400" size={20} />;
      case 3:
        return <Medal className="text-orange-400" size={20} />;
      default:
        return <Star className="text-gray-600" size={20} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={clsx(
        'glass-panel p-3',
        rank <= 3 ? 'bg-yellow-400/10' : ''
      )}
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 text-center font-bold">
          {rank}
        </div>

        <div className="w-8">
          {getPlayerIcon()}
        </div>

        <div className="flex-1">
          <div className="font-medium">
            {player.name}
          </div>
          <div className="text-sm text-gray-400">
            {formatScore(player.score)} points
          </div>
        </div>

        <ChevronRight className="text-gray-400" size={20} />
      </div>
    </motion.div>
  );
};

export default React.memo(LeaderboardItem);