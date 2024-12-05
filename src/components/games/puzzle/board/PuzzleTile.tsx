import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface Props {
  value: number;
  index: number;
  isCorrect: boolean;
  onClick: () => void;
  disabled: boolean;
}

const PuzzleTile: React.FC<Props> = ({
  value,
  isCorrect,
  onClick,
  disabled
}) => {
  if (value === 0) {
    return <div data-testid="puzzle-tile-empty" className="aspect-square" />;
  }

  return (
    <motion.button
      data-testid="puzzle-tile"
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      onClick={disabled ? undefined : onClick}
      className={clsx(
        'aspect-square glass-panel',
        'flex items-center justify-center',
        'text-2xl font-bold',
        'bg-gradient-to-br from-yellow-400/20 to-orange-500/20',
        isCorrect ? 'text-yellow-400' : 'text-gray-400',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      )}
    >
      {value}
    </motion.button>
  );
};

export default React.memo(PuzzleTile);