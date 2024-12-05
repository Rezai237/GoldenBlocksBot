import React from 'react';
import { TournamentRewards } from '../../../types/tournament';
import RewardItem from './RewardItem';

interface Props {
  rewards: TournamentRewards;
}

const RewardsList: React.FC<Props> = ({ rewards }) => {
  const rewardItems = [
    { position: 1, reward: rewards.first },
    { position: 2, reward: rewards.second },
    { position: 3, reward: rewards.third }
  ];

  return (
    <div className="space-y-3">
      {rewardItems.map((item, index) => (
        <RewardItem
          key={item.position}
          position={item.position}
          reward={item.reward}
          index={index}
        />
      ))}
    </div>
  );
};

export default React.memo(RewardsList);