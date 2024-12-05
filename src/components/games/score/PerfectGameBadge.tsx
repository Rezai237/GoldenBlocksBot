import React from 'react';
import { motion } from 'framer-motion';

const PerfectGameBadge: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="mt-3 text-center text-yellow-400 text-sm font-medium"
    >
      Perfect Game! 🎉
    </motion.div>
  );
};

export default React.memo(PerfectGameBadge);