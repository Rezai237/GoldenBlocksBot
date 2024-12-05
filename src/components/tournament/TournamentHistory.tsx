import React from 'react';
import { motion } from 'framer-motion';
import { History, Trophy, Calendar, Users } from 'lucide-react';
import { Tournament } from '../../types/tournament';
import { formatDistanceToNow } from 'date-fns';
import { formatScore } from '../../utils/scoring';
import clsx from 'clsx';

interface Props {
  tournaments: Tournament[];
}

const TournamentHistory: React.FC<Props> = ({ tournaments }) => {
  if (tournaments.length === 0) {
    return (
      <div className="glass-panel p-4">
        <div className="text-center py-8">
          <History className="mx-auto mb-3 text-gray-500" size={24} />
          <p className="text-gray-400">No tournament history</p>
          <p className="text-sm text-gray-500 mt-1">
            Past tournaments will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-4">
      <h2 className="font-bold mb-4">Tournament History</h2>

      <div className="space-y-3">
        {tournaments.map((tournament, index) => {
          const winner = tournament.players
            .sort((a, b) => b.score - a.score)[0];

          return (
            <motion.div
              key={tournament.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-panel p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Trophy className="text-yellow-400" size={20} />
                  <div>
                    <h3 className="font-medium">{tournament.title}</h3>
                    <p className="text-sm text-gray-400">
                      {formatDistanceToNow(tournament.endTime, { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="flex items-center justify-end space-x-2 text-gray-400">
                    <Users size={14} />
                    <span>{tournament.stats.totalParticipants} players</span>
                  </div>
                  <div className="flex items-center justify-end space-x-2 text-gray-400 mt-1">
                    <Calendar size={14} />
                    <span>
                      {formatDistanceToNow(tournament.endTime - tournament.startTime)}
                    </span>
                  </div>
                </div>
              </div>

              {winner && (
                <div className={clsx(
                  'mt-3 pt-3 border-t border-gray-700',
                  'flex items-center justify-between'
                )}>
                  <div className="flex items-center space-x-2">
                    <Trophy size={16} className="text-yellow-400" />
                    <span className="text-sm">Winner:</span>
                    <span className="font-medium">{winner.name}</span>
                  </div>
                  <div className="text-yellow-400 font-medium">
                    {formatScore(winner.score)}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TournamentHistory;