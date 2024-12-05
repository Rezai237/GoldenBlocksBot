import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { useTournamentStore } from '../../stores/tournamentStore';
import { hapticFeedback } from '../../utils/telegram';
import clsx from 'clsx';

const TournamentNotifications = () => {
  const { notifications, clearNotifications } = useTournamentStore();
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    if (notifications.length > 0) {
      hapticFeedback.notification('success');
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  if (!show || notifications.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        className="fixed top-0 left-0 right-0 z-50 p-4"
      >
        <div className="glass-panel p-4 border-2 border-yellow-400/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Bell className="text-yellow-400" size={20} />
              <h3 className="font-bold">Tournament Updates</h3>
            </div>
            <button
              onClick={() => {
                hapticFeedback.impact('light');
                setShow(false);
                clearNotifications();
              }}
              className="p-2 hover:bg-white/5 rounded-lg"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          <div className="space-y-2">
            {notifications.map((notification, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={clsx(
                  'text-sm py-2 px-3 rounded-lg',
                  'bg-white/5'
                )}
              >
                {notification}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TournamentNotifications;