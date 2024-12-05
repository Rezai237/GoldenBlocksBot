import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Target, ChevronRight, Coins } from 'lucide-react';
import { SponsorTask as SponsorTaskType } from '../../types/sponsor';
import { formatDistanceToNow } from 'date-fns';
import { hapticFeedback } from '../../utils/telegram';
import clsx from 'clsx';

interface Props {
  task: SponsorTaskType;
  onStart: () => void;
}

const SponsorTask: React.FC<Props> = ({ task, onStart }) => {
  const getTaskIcon = () => {
    switch (task.requirements.type) {
      case 'play':
        return Trophy;
      case 'score':
        return Target;
      case 'time':
        return Clock;
      default:
        return Trophy;
    }
  };

  const TaskIcon = getTaskIcon();
  const progress = (task.requirements.current / task.requirements.target) * 100;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="glass-panel p-4 relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent"
        animate={{
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <TaskIcon className="text-purple-400" size={20} />
            <h3 className="font-semibold">{task.title}</h3>
          </div>
          <div className="text-sm text-gray-400">
            {formatDistanceToNow(task.expiresAt, { addSuffix: true })}
          </div>
        </div>

        <p className="text-gray-300 mb-3">{task.description}</p>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-purple-400 to-pink-500"
            />
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Progress: {task.requirements.current} / {task.requirements.target}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-purple-400">
              <Coins size={14} />
              <span>+{task.reward.tokens} tokens</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-400">Points: </span>
              <span className="text-purple-400">+{task.reward.points}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              hapticFeedback.impact('light');
              onStart();
            }}
            className="flex items-center space-x-1 text-sm text-purple-400 hover:text-purple-300"
          >
            <span>Start Task</span>
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SponsorTask;