import React from 'react';
import { motion } from 'framer-motion';
import PuzzleTile from './PuzzleTile';
import clsx from 'clsx';

interface Props {
  tiles: number[];
  onTileClick: (index: number) => void;
  disabled: boolean;
  gridSize: number;
}

const PuzzleBoard: React.FC<Props> = ({
  tiles,
  onTileClick,
  disabled,
  gridSize
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={clsx(
        'grid gap-2',
        gridSize === 3 && 'grid-cols-3',
        gridSize === 4 && 'grid-cols-4',
        gridSize === 5 && 'grid-cols-5'
      )}
    >
      {tiles.map((value, index) => (
        <PuzzleTile
          key={index}
          value={value}
          index={index}
          isCorrect={value === (index + 1) % (gridSize * gridSize)}
          onClick={() => onTileClick(index)}
          disabled={disabled || value === 0}
        />
      ))}
    </motion.div>
  );
};

export default React.memo(PuzzleBoard);