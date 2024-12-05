import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Puzzle, Trophy, Gift, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { hapticFeedback } from '../utils/telegram';
import { useUserStore } from '../stores/userStore';
import WeeklyTournament from '../components/WeeklyTournament';
import clsx from 'clsx';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const quickActions = [
    {
      title: 'Play Games',
      description: 'Challenge yourself with fun games',
      icon: Puzzle,
      color: 'from-yellow-400 to-orange-500',
      path: '/games',
    },
    {
      title: 'Daily Rewards',
      description: 'Collect your daily bonus',
      icon: Gift,
      color: 'from-green-400 to-emerald-500',
      path: '/earn',
    },
    {
      title: 'Leaderboard',
      description: 'See where you rank',
      icon: Trophy,
      color: 'from-blue-400 to-purple-500',
      path: '/leaderboard',
    },
  ];

  const handleNavigation = (path: string) => {
    hapticFeedback.impact('light');
    navigate(path);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20"
    >
      {/* Welcome Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-panel p-6 mb-6"
      >
        <div className="flex items-center space-x-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500"
          >
            <Sparkles size={24} className="text-black" />
          </motion.div>
          
          <div>
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold"
            >
              Welcome back,
            </motion.h1>
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400"
            >
              {user?.first_name || 'Player'}!
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Weekly Tournament */}
      <div className="mb-6">
        <WeeklyTournament />
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.path}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * (index + 1) }}
            onClick={() => handleNavigation(action.path)}
            className="w-full glass-panel p-4 relative overflow-hidden active:scale-98"
          >
            <div className="relative flex items-center space-x-4">
              <div className={clsx(
                'p-3 rounded-xl bg-gradient-to-br',
                action.color
              )}>
                <action.icon size={24} className="text-black" />
              </div>
              
              <div className="flex-1 text-left">
                <h3 className="font-semibold">{action.title}</h3>
                <p className="text-sm text-gray-400">{action.description}</p>
              </div>

              <ChevronRight size={20} className="text-gray-500" />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Home;