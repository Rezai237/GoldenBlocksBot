import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Zap, Award } from 'lucide-react';
import { useRewardStore } from '../../stores/rewardStore';
import DailyRewardsGrid from './DailyRewardsGrid';

const DailyRewards = () => {
  const { 
    rewards,
    streak,
    initializeDailyRewards,
    claimDailyReward,
    getAvailableReward,
    resetStore // Add resetStore
  } = useRewardStore();

  useEffect(() => {
    if (rewards.length === 0 || rewards.length < 15) { // Check for correct length
      resetStore(); // Reset store if rewards are not correct
      initializeDailyRewards();
    }
  }, [rewards.length, initializeDailyRewards, resetStore]);

  const handleClaim = () => {
    claimDailyReward();
  };

  const availableReward = getAvailableReward();

  return (
    <div className="space-y-6">
      {/* Streak Info */}
      <div className="glass-panel p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500">
              <Zap size={20} className="text-black" />
            </div>
            <div>
              <h3 className="font-bold">Daily Streak</h3>
              <p className="text-sm text-gray-400">
                {streak.current} day{streak.current !== 1 ? 's' : ''} streak
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Best Streak</div>
            <div className="font-bold text-yellow-400">{streak.longest} days</div>
          </div>
        </div>

        {streak.maintainedDays > 0 && (
          <div className="mt-3 flex items-center justify-between border-t border-gray-700 pt-3">
            <div className="flex items-center space-x-2">
              <Award className="text-purple-400" size={16} />
              <span className="text-sm text-gray-400">Bonus Streak</span>
            </div>
            <div className="text-purple-400 font-medium">
              +{streak.maintainedDays} days
            </div>
          </div>
        )}
      </div>

      {/* Progress Overview */}
      <div className="glass-panel p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Gift className="text-yellow-400" size={20} />
          <h3 className="font-bold">Daily Rewards</h3>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-yellow-400">
              {rewards.filter(r => r.claimed).length}
            </div>
            <div className="text-sm text-gray-400">Claimed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">
              {rewards.length}
            </div>
            <div className="text-sm text-gray-400">Total Days</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">
              {rewards.filter(r => r.isMilestone).length}
            </div>
            <div className="text-sm text-gray-400">Milestones</div>
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <DailyRewardsGrid
        rewards={rewards}
        availableRewardId={availableReward?.id || null}
        onClaim={handleClaim}
      />
    </div>
  );
};

export default DailyRewards;