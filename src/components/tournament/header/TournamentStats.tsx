import React from 'react';
import { Timer, Users } from 'lucide-react';
import { formatTimeRemaining } from '../../../utils/tournament';
import { Tournament } from '../../../types/tournament';

interface Props {
  tournament: Tournament;
  activePlayers: number;
}

const TournamentStats: React.FC<Props> = ({ tournament, activePlayers }) => {
  const timeRemaining = formatTimeRemaining(tournament);

  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      <div className="glass-panel p-3">
        <div className="flex items-center space-x-2 text-gray-400 mb-1">
          <Timer size={16} />
          <span className="text-sm">Time Left</span>
        </div>
        <div className="text-lg font-bold text-yellow-400">
          {timeRemaining}
        </div>
      </div>

      <div className="glass-panel p-3">
        <div className="flex items-center space-x-2 text-gray-400 mb-1">
          <Users size={16} />
          <span className="text-sm">Participants</span>
        </div>
        <div className="text-lg font-bold text-yellow-400">
          {activePlayers}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TournamentStats);