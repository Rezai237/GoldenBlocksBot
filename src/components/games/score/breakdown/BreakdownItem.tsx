import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  icon: LucideIcon;
  label: string;
  value: number;
  color: string;
  index: number;
}

const BreakdownItem: React.FC<Props> = ({ icon: Icon, label, value, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between"
    >
      <div className="flex items-center space-x-2">
        <Icon className={clsx('w-4 h-4', color)} />
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <span className={clsx(
        'font-medium',
        value >= 0 ? 'text-green-400' : 'text-red-400'
      )}>
        {value >= 0 ? '+' : ''}{value.toLocaleString()}
      </span>
    </motion.div>
  );
};

export default React.memo(BreakdownItem);