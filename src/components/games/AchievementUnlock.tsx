import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { Achievement } from '../../types/achievement';
import { hapticFeedback } from '../../utils/telegram';
import clsx from 'clsx';

interface Props {
  achievement: Achievement;
  onClose: () => void;
}

const AchievementUnlock: React.FC<Props> = ({ achievement, onClose }) => {
  React.useEffect(() => {
    hapticFeedback.notification('success');
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-24 left-4 right-4 z-50"
      >
        <motion.div
          className={clsx(
            'glass-panel p-4 border-2',
            achievement.tier === 'gold' ? 'border-yellow-400' :
            achievement.tier === 'silver' ? 'border-gray-400' :
            'border-orange-400'
          )}
          animate={{
            scale: [1, 1.02, 1],
            borderColor: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="flex items-center space-x-3">
            <div className={clsx(
              'w-12 h-12 rounded-xl flex items-center justify-center',
              'bg-gradient-to-br',
              achievement.tier === 'gold' ? 'from-yellow-400 to-orange-500' :
              achievement.tier === 'silver' ? 'from-gray-300 to-gray-400' :
              'from-orange-400 to-orange-500'
            )}>
              <Star className="text-black" size={24} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-bold">{achievement.title}</h3>
                <span className="text-yellow-400">+{achievement.points}</span>
              </div>
              <p className="text-sm text-gray-400">{achievement.description}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AchievementUnlock;