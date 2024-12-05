import React from 'react';
import { motion } from 'framer-motion';
import { GameType, GameState, GameConfig } from '../../types/game';
import GameHeader from './GameHeader';
import GameControls from './GameControls';
import GameScore from './GameScore';

interface Props {
  title: string;
  gameType: GameType;
  gameState: GameState;
  config: GameConfig;
  onConfigChange: (config: GameConfig) => void;
  onStart: () => void;
  onReset: () => void;
  children: React.ReactNode;
}

const GameLayout: React.FC<Props> = ({
  title,
  gameType,
  gameState,
  config,
  onConfigChange,
  onStart,
  onReset,
  children
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20 px-4"
    >
      <GameHeader
        title={title}
        gameType={gameType}
        gameState={gameState}
      />

      <div className="space-y-6">
        {gameState.status === 'completed' ? (
          <GameScore
            score={gameState.score}
            onPlayAgain={onReset}
          />
        ) : (
          <>
            <GameControls
              gameState={gameState}
              config={config}
              onConfigChange={onConfigChange}
              onStart={onStart}
              onReset={onReset}
            />
            {children}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default GameLayout;
