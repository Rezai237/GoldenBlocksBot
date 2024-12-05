import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';
import { Tournament } from '../../types/tournament';
import { formatTimeRemaining } from '../../utils/tournament';
import { hapticFeedback } from '../../utils/telegram';

interface Props {
  tournament: Tournament;
  onClose: () => void;
}

const TournamentNotification: React.FC<Props> = ({ tournament, onClose }) => {
  React.useEffect(() => {
    hapticFeedback.notification('success');
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        className="fixed top-0 left-0 right-0 z-50 p-4"
      >
        <div className="glass-panel p-4 border-2 border-yellow-400/30">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500">
              <Trophy size={20} className="text-black" />
            </div>

            <div className="flex-1">
              <h3 className="font-bold">New Tournament Started!</h3>
              <p className="text-sm text-gray-400">
                Ends in {formatTimeRemaining(tournament)}
              </p>
            </div>

            <button
              onClick={() => {
                hapticFeedback.impact('light');
                onClose();
              }}
              className="p-2 hover:bg-white/5 rounded-lg"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TournamentNotification;