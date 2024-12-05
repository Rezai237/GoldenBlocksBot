import React from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '../stores/playerStore';
import { useUserStore } from '../stores/userStore';
import PlayerStats from '../components/PlayerStats';
import RecentActivities from '../components/RecentActivities';
import ProfileAchievements from '../components/profile/ProfileAchievements';
import clsx from 'clsx';

const Profile = () => {
  const { user } = useUserStore();
  const { stats, lastActive } = usePlayerStore();
  const [activeTab, setActiveTab] = React.useState<'stats' | 'achievements' | 'activities'>('stats');

  console.log('Profile render:', { user, stats, lastActive });

  const tabs = [
    { id: 'stats', label: 'Stats' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'activities', label: 'Activities' }
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20 px-4"
    >
      {/* User Info */}
      <div className="glass-panel p-6 mb-6">
        <div className="flex items-center gap-4">
          {user?.photoUrl ? (
            <img 
              src={user.photoUrl} 
              alt={user.firstName} 
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <span className="text-2xl font-bold text-black">
                {user?.firstName?.[0] || '?'}
              </span>
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold">
              {user?.firstName} {user?.lastName}
            </h2>
            {user?.username && (
              <p className="text-gray-400">@{user.username}</p>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'flex-1 py-2 px-4 rounded-lg transition-colors',
              activeTab === tab.id
                ? 'bg-yellow-400 text-black'
                : 'glass-panel text-gray-400'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'stats' && <PlayerStats />}
        {activeTab === 'achievements' && <ProfileAchievements />}
        {activeTab === 'activities' && <RecentActivities />}
      </motion.div>

      {/* Development Mode Indicator */}
      {import.meta.env.DEV && (
        <div className="fixed top-0 left-0 bg-yellow-400 text-black px-2 py-1 text-xs">
          DEV MODE
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
