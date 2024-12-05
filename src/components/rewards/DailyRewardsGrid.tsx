import React from 'react';
import { motion } from 'framer-motion';
import { DailyReward as DailyRewardType } from '../../types/rewards';
import DailyReward from './DailyReward';

interface Props {
  rewards: DailyRewardType[];
  availableRewardId: string | null;
  onClaim: () => void;
}

const DailyRewardsGrid: React.FC<Props> = ({
  rewards,
  availableRewardId,
  onClaim
}) => {
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      {rewards.map((reward, index) => (
        <motion.div
          key={reward.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: index * 0.05,
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          <DailyReward
            reward={reward}
            onClaim={onClaim}
            disabled={reward.id !== availableRewardId}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default React.memo(DailyRewardsGrid);