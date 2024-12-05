import React from 'react';
import { Tournament } from '../../types/tournament';
import RewardsList from './rewards/RewardsList';

interface Props {
  tournament: Tournament;
}

const TournamentRewards: React.FC<Props> = ({ tournament }) => {
  return (
    <div className="glass-panel p-4">
      <h2 className="font-bold mb-4">Tournament Rewards</h2>
      <RewardsList rewards={tournament.rewards} />
    </div>
  );
};

export default React.memo(TournamentRewards);