import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Users, AlertTriangle } from 'lucide-react';
import { Tournament } from '../../types/tournament';
import { useTournamentStore } from '../../stores/tournamentStore';
import { useUserStore } from '../../stores/userStore';
import { hapticFeedback } from '../../utils/telegram';
import clsx from 'clsx';

interface Props {
  tournament: Tournament;
}

const TournamentJoin: React.FC<Props> = ({ tournament }) => {
  const { user } = useUserStore();
  const { addPlayer } = useTournamentStore();
  const [isJoining, setIsJoining] = React.useState(false);

  const isParticipating = tournament.players?.some(p => p.id === user?.id);
  const isFull = tournament.players?.length >= (tournament.maxPlayers || Infinity);

  const handleJoin = async () => {
    if (!user || isParticipating || isFull) return;

    try {
      setIsJoining(true);
      hapticFeedback.impact('medium');

      await addPlayer({
        id: user.id,
        name: user.firstName,
        score: 0,
        lastUpdated: Date.now(),
        isActive: true,
        avatarUrl: user.photoUrl
      });

      hapticFeedback.notification('success');
    } catch (error) {
      console.error('Failed to join tournament:', error);
      hapticFeedback.notification('error');
    } finally {
      setIsJoining(false);
    }
  };

  if (isParticipating) {
    return (
      <div className="glass-panel p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="text-green-400" size={20} />
            <div>
              <div className="font-medium">You're Participating</div>
              <div className="text-sm text-gray-400">Good luck!</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <UserPlus className="text-yellow-400" size={20} />
          <div>
            <div className="font-medium">Join Tournament</div>
            <div className="text-sm text-gray-400">
              {tournament.players?.length || 0} / {tournament.maxPlayers || '∞'} players
            </div>
          </div>
        </div>

        <motion.button
          whileHover={!isFull ? { scale: 1.05 } : undefined}
          whileTap={!isFull ? { scale: 0.95 } : undefined}
          onClick={handleJoin}
          disabled={isFull || isJoining}
          className={clsx(
            'px-4 py-2 rounded-lg font-medium',
            'transition-colors duration-200',
            isFull
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-yellow-400 text-black'
          )}
        >
          {isJoining ? 'Joining...' : isFull ? 'Full' : 'Join Now'}
        </motion.button>
      </div>

      {isFull && (
        <div className="mt-3 flex items-center space-x-2 text-sm text-orange-400">
          <AlertTriangle size={16} />
          <span>Tournament is full</span>
        </div>
      )}
    </div>
  );
};

export default TournamentJoin;