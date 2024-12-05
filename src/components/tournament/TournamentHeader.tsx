import React from 'react';
import { Tournament } from '../../types/tournament';
import TournamentTitle from './header/TournamentTitle';
import TournamentStats from './header/TournamentStats';
import TournamentProgress from './header/TournamentProgress';

interface Props {
  tournament: Tournament;
}

const TournamentHeader: React.FC<Props> = ({ tournament }) => {
  const activePlayers = tournament.players?.filter(p => p.isActive)?.length || 0;

  return (
    <div className="glass-panel p-4">
      <TournamentTitle 
        title={tournament.title}
        description={tournament.description}
      />
      
      <TournamentStats 
        tournament={tournament}
        activePlayers={activePlayers}
      />
      
      <TournamentProgress 
        tournament={tournament}
        activePlayers={activePlayers}
      />
    </div>
  );
};

export default React.memo(TournamentHeader);