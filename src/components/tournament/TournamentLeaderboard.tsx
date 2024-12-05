import React from 'react';
import { Tournament } from '../../types/tournament';
import { sortPlayersByRank } from '../../utils/tournament';
import LeaderboardItem from './leaderboard/LeaderboardItem';
import EmptyLeaderboard from './leaderboard/EmptyLeaderboard';

interface Props {
  tournament: Tournament;
}

const TournamentLeaderboard: React.FC<Props> = ({ tournament }) => {
  // Ensure we have valid players array and sort them
  const rankedPlayers = React.useMemo(() => {
    if (!tournament.players) return [];
    return sortPlayersByRank(tournament.players.filter(p => p.isActive));
  }, [tournament.players]);

  return (
    <div className="glass-panel p-4">
      <h2 className="font-bold mb-4">Current Rankings</h2>

      <div className="space-y-3">
        {rankedPlayers.length > 0 ? (
          rankedPlayers.slice(0, 10).map((player, index) => (
            <LeaderboardItem
              key={player.id}
              player={player}
              rank={index + 1}
            />
          ))
        ) : (
          <EmptyLeaderboard />
        )}
      </div>
    </div>
  );
};

export default React.memo(TournamentLeaderboard);