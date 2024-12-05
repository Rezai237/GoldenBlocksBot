import React from 'react';
import { motion } from 'framer-motion';
import { useTournamentStore } from '../stores/tournamentStore';
import { useUserStore } from '../stores/userStore';
import TournamentHeader from './tournament/TournamentHeader';
import TournamentLeaderboard from './tournament/TournamentLeaderboard';
import TournamentRewards from './tournament/TournamentRewards';
import TournamentStats from './tournament/TournamentStats';
import TournamentHistory from './tournament/TournamentHistory';
import TournamentNotifications from './tournament/TournamentNotifications';
import LoadingSpinner from './LoadingSpinner';

const WeeklyTournament = () => {
  const { 
    currentTournament, 
    history,
    initializeWeeklyTournament,
    addPlayer
  } = useTournamentStore();
  const { user } = useUserStore();
  const [isInitializing, setIsInitializing] = React.useState(true);

  // Initialize tournament and auto-join user
  React.useEffect(() => {
    const init = async () => {
      if (!currentTournament) {
        await initializeWeeklyTournament();
      }
      
      // Auto-join user if not already participating
      if (user && currentTournament && !currentTournament.players?.some(p => p.id === user.id)) {
        await addPlayer({
          id: user.id,
          name: user.firstName,
          score: 0,
          lastUpdated: Date.now(),
          isActive: true,
          avatarUrl: user.photoUrl
        });
      }

      setIsInitializing(false);
    };
    init();
  }, [currentTournament, initializeWeeklyTournament, user, addPlayer]);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (!currentTournament) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <TournamentHeader tournament={currentTournament} />
      
      {/* Only show stats if we have participants */}
      {currentTournament.players && currentTournament.players.length > 0 && (
        <TournamentStats tournament={currentTournament} />
      )}
      
      <TournamentLeaderboard tournament={currentTournament} />
      <TournamentRewards tournament={currentTournament} />
      
      {history.length > 0 && (
        <TournamentHistory tournaments={history} />
      )}

      <TournamentNotifications />
    </motion.div>
  );
};

export default WeeklyTournament;