import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, RefreshCw } from 'lucide-react';
import { hapticFeedback } from '../../utils/telegram';

interface Props {
  onRefresh: () => void;
}

const AdminHeader: React.FC<Props> = ({ onRefresh }) => {
  return (
    <div className="glass-panel p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500">
            <BarChart size={24} className="text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400">Monitor game performance</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            hapticFeedback.impact('light');
            onRefresh();
          }}
          className="p-2 glass-panel rounded-lg text-purple-400 hover:text-purple-300"
        >
          <RefreshCw size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default AdminHeader;