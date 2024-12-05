import React from 'react';
import { motion } from 'framer-motion';
import { calculateTournamentProgress } from '../../../utils/tournament';
import { Tournament } from '../../../types/tournament';

interface Props {
  tournament: Tournament;
  activePlayers: number;
}

const TournamentProgress: React.FC<Props> = ({ tournament, activePlayers }) => {
  const progress = calculateTournamentProgress(tournament);

  return (
    <div className="mt-4">
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
        />
      </div>
      <div className="mt-1 text-xs text-gray-400 flex justify-between">
        <span>{activePlayers} players</span>
        <span>Min. {tournament.minPlayersRequired} required</span>
      </div>
    </div>
  );
};

export default React.memo(TournamentProgress);