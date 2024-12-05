import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Coins, Trophy, Clock, Star, Check, Lock } from 'lucide-react';
import { DailyReward as DailyRewardType } from '../../types/rewards';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

interface Props {
  reward: DailyRewardType;
  onClaim: () => void;
  disabled?: boolean;
}

const DailyReward: React.FC<Props> = ({ reward, onClaim, disabled }) => {
  const isExpired = Date.now() > reward.expiresAt;
  const isAvailable = Date.now() >= reward.availableAt && !isExpired;

  return (
    <motion.div
      whileHover={!disabled && !reward.claimed ? { scale: 1.02 } : undefined}
      className={clsx(
        'glass-panel relative overflow-hidden',
        'transition-all duration-300',
        reward.claimed ? 'opacity-75 bg-green-400/5' : '',
        reward.isMilestone ? 'border-2 border-yellow-400/30' : '',
        isAvailable && !reward.claimed ? 'ring-2 ring-yellow-400/30 ring-offset-2 ring-offset-black' : ''
      )}
    >
      {/* Background Animation */}
      <motion.div
        className={clsx(
          'absolute inset-0 bg-gradient-to-br opacity-20',
          reward.isMilestone
            ? 'from-yellow-400 via-orange-500 to-yellow-400'
            : 'from-yellow-400/20 to-transparent'
        )}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear'
        }}
      />

      {/* Content */}
      <div className="relative p-4">
        <div className="flex items-center space-x-4">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            className={clsx(
              'w-12 h-12 rounded-xl flex items-center justify-center',
              reward.isMilestone
                ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                : 'glass-panel bg-gradient-to-br from-yellow-400/20 to-orange-500/20'
            )}
          >
            {reward.claimed ? (
              <Check size={24} className={reward.isMilestone ? 'text-black' : 'text-green-400'} />
            ) : reward.isMilestone ? (
              <Star size={24} className="text-black" />
            ) : isAvailable ? (
              <Gift size={24} className="text-yellow-400" />
            ) : (
              <Lock size={24} className="text-gray-400" />
            )}
          </motion.div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="font-bold flex items-center space-x-2">
                <span>Day {reward.day}</span>
                {reward.isMilestone && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400">
                    Milestone
                  </span>
                )}
              </div>
              {!reward.claimed && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="flex items-center space-x-1 text-gray-400"
                  >
                    <Clock size={14} />
                    <span className="text-xs">
                      {formatDistanceToNow(reward.expiresAt, { addSuffix: true })}
                    </span>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Rewards */}
            <div className="space-y-1.5">
              <div className="flex items-center space-x-1.5 text-sm">
                <Trophy size={14} className="text-yellow-400" />
                <span className={reward.isMilestone ? 'text-yellow-400 font-medium' : ''}>
                  +{reward.points.toLocaleString()} points
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-sm">
                <Coins size={14} className="text-yellow-400" />
                <span className={reward.isMilestone ? 'text-yellow-400 font-medium' : ''}>
                  +{reward.tokens} tokens
                </span>
              </div>
            </div>

            {/* Claim Button */}
            <motion.button
              whileHover={!disabled && !reward.claimed && isAvailable ? { scale: 1.02 } : undefined}
              whileTap={!disabled && !reward.claimed && isAvailable ? { scale: 0.98 } : undefined}
              onClick={onClaim}
              disabled={disabled || reward.claimed || !isAvailable}
              className={clsx(
                'mt-3 w-full py-2 px-3 rounded-lg text-sm font-medium',
                'transition-all duration-300',
                reward.claimed
                  ? 'bg-green-400/20 text-green-400 cursor-not-allowed'
                  : isAvailable
                  ? reward.isMilestone
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg shadow-yellow-400/20'
                    : 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20'
                  : 'glass-panel text-gray-400 cursor-not-allowed'
              )}
            >
              {reward.claimed ? (
                <span className="flex items-center justify-center space-x-1">
                  <Check size={14} />
                  <span>Claimed</span>
                </span>
              ) : isExpired ? (
                'Expired'
              ) : isAvailable ? (
                'Claim Now'
              ) : (
                'Coming Soon'
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(DailyReward);