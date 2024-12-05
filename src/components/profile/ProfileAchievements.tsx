import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star } from 'lucide-react';
import { useAchievementStore } from '../../stores/achievementStore';
import { getAchievementProgress, formatAchievementProgress } from '../../utils/achievements';
import clsx from 'clsx';

const ProfileAchievements = () => {
  const { getAchievements } = useAchievementStore();
  const achievements = getAchievements();

  const totalPoints = achievements
    .filter(a => a.isUnlocked)
    .reduce((sum, a) => sum + a.points, 0);

  if (achievements.length === 0) {
    return (
      <div className="glass-panel p-4">
        <div className="text-center py-4">
          <Trophy className="mx-auto mb-3 text-gray-500" size={24} />
          <p className="text-gray-400">No achievements yet</p>
          <p className="text-sm text-gray-500 mt-1">Keep playing to unlock achievements!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Trophy className="text-yellow-400" size={24} />
          <div>
            <h2 className="text-lg font-bold">Achievements</h2>
            <p className="text-sm text-gray-400">
              {achievements.filter(a => a.isUnlocked).length} of {achievements.length} unlocked
            </p>
          </div>
        </div>
        <div className="text-yellow-400 font-bold">
          {totalPoints.toLocaleString()} pts
        </div>
      </div>

      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={clsx(
              'glass-panel p-3',
              achievement.isUnlocked ? 'bg-yellow-400/10' : 'opacity-50'
            )}
          >
            <div className="flex items-center space-x-3">
              <div className={clsx(
                'w-10 h-10 rounded-lg flex items-center justify-center',
                'bg-gradient-to-br',
                achievement.tier === 'gold' ? 'from-yellow-400 to-orange-500' :
                achievement.tier === 'silver' ? 'from-gray-300 to-gray-400' :
                'from-orange-400 to-orange-500'
              )}>
                {achievement.tier === 'gold' ? (
                  <Trophy size={20} className="text-black" />
                ) : achievement.tier === 'silver' ? (
                  <Medal size={20} className="text-black" />
                ) : (
                  <Star size={20} className="text-black" />
                )}
              </div>

              <div className="flex-1">
                <div className="font-semibold">{achievement.title}</div>
                <div className="text-sm text-gray-400">{achievement.description}</div>
              </div>

              <div className="text-right">
                <div className="text-yellow-400 font-bold">
                  {achievement.points.toLocaleString()} pts
                </div>
                <div className="text-xs text-gray-400">
                  {formatAchievementProgress(achievement)}
                </div>
              </div>
            </div>

            {!achievement.isUnlocked && (
              <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getAchievementProgress(achievement)}%` }}
                  className="h-full bg-yellow-400"
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAchievements;