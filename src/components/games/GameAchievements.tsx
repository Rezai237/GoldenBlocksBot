import { motion } from 'framer-motion';
import { Achievement } from '../../types/achievement';
import { getAchievementProgress, formatAchievementProgress } from '../../utils/achievements';

interface Props {
  achievements: Achievement[];
}

const GameAchievements = ({ achievements }: Props) => {
  console.log('Rendering GameAchievements with:', achievements.length, 'achievements');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Achievements</h2>
        <div className="text-sm text-gray-400">
          {achievements.filter(a => a.isUnlocked).length} / {achievements.length}
        </div>
      </div>

      <div className="space-y-3">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={false}
            animate={{
              opacity: achievement.isUnlocked ? 1 : 0.7,
              scale: achievement.isUnlocked ? 1 : 0.98
            }}
            className="glass-panel p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{achievement.icon}</span>
                  <span className="font-bold">{achievement.title}</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {achievement.description}
                </p>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  achievement.tier === 'gold' ? 'text-yellow-400' :
                  achievement.tier === 'silver' ? 'text-gray-400' :
                  'text-yellow-700'
                }`}>
                  {achievement.points} pts
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatAchievementProgress(achievement)}
                </div>
              </div>
            </div>

            {!achievement.isUnlocked && (
              <div className="mt-2 bg-black/30 rounded-full h-1 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getAchievementProgress(achievement)}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-yellow-400"
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {import.meta.env.DEV && (
        <div className="text-xs text-gray-500 mt-4">
          Debug Info: {JSON.stringify(achievements.map(a => ({
            id: a.id,
            progress: a.progress,
            isUnlocked: a.isUnlocked
          })), null, 2)}
        </div>
      )}
    </motion.div>
  );
};

export default GameAchievements;
