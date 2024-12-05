import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Award, Clock } from 'lucide-react';
import { useTournamentStore } from '../../stores/tournamentStore';
import { formatScore } from '../../utils/scoring';
import { formatTimeRemaining } from '../../utils/tournament';
import clsx from 'clsx';

const AdminTournamentStats = () => {
  const { currentTournament, history } = useTournamentStore();

  if (!currentTournament) {
    return null;
  }

  const activePlayers = currentTournament.players?.filter(p => p.isActive)?.length || 0;
  const topPlayer = currentTournament.players
    ?.sort((a, b) => b.score - a.score)[0];

  return (
    <div className="glass-panel p-4 mb-6">
      <h2 className="text-lg font-bold mb-4">Tournament Overview</h2>

      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-4 relative overflow-hidden"
        >
          <div className="flex items-center space-x-3">
            <Trophy className="text-yellow-400" size={20} />
            <div>
              <div className="text-sm text-gray-400">Top Score</div>
              <div className="font-bold">
                {topPlayer ? formatScore(topPlayer.score) : '0'}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-4"
        >
          <div className="flex items-center space-x-3">
            <Users className="text-blue-400" size={20} />
            <div>
              <div className="text-sm text-gray-400">Active Players</div>
              <div className="font-bold">{activePlayers}</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-4"
        >
          <div className="flex items-center space-x-3">
            <Clock className="text-green-400" size={20} />
            <div>
              <div className="text-sm text-gray-400">Time Remaining</div>
              <div className="font-bold">
                {formatTimeRemaining(currentTournament)}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-4"
        >
          <div className="flex items-center space-x-3">
            <Award className="text-purple-400" size={20} />
            <div>
              <div className="text-sm text-gray-400">Past Tournaments</div>
              <div className="font-bold">{history.length}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminTournamentStats;