import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Trophy, Coins, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { hapticFeedback } from '../utils/telegram';
import clsx from 'clsx';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Coins, path: '/earn', label: 'Earn' },
    { icon: Trophy, path: '/leaderboard', label: 'Top' },
    { icon: User, path: '/profile', label: 'Profile' },
  ];

  const handleNavigation = (path: string) => {
    hapticFeedback.impact('light');
    navigate(path);
  };

  return (
    <motion.nav
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 glass-panel border-t border-white/5 backdrop-blur-lg z-50"
    >
      <div className="safe-area-bottom">
        <div className="container mx-auto">
          <div className="flex justify-between items-stretch h-[56px]">
            {navItems.map(({ icon: Icon, path, label }) => {
              const isActive = location.pathname === path;
              return (
                <motion.button
                  key={path}
                  onClick={() => handleNavigation(path)}
                  whileTap={{ scale: 0.95 }}
                  className={clsx(
                    'flex-1 flex flex-col items-center justify-center relative',
                    'touch-manipulation active:bg-white/5',
                    'min-w-[56px] max-w-[72px] h-full',
                    isActive ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-300'
                  )}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={path + location.pathname}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex flex-col items-center"
                    >
                      <Icon size={22} strokeWidth={2.5} />
                      <span className="text-[10px] font-medium mt-0.5 tracking-tight">{label}</span>
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;