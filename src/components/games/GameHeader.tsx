import React from 'react';
import { Trophy } from 'lucide-react';
import { GameType, GameState } from '../../types/game';

interface Props {
  title: string;
  gameType: GameType;
  gameState: GameState;
}

const GameHeader: React.FC<Props> = ({ title, gameState }) => {
  const getSubtitle = () => {
    switch (gameState.status) {
      case 'idle':
        return 'Choose difficulty to start';
      case 'playing':
        return 'Game in progress';
      case 'paused':
        return 'Game paused';
      case 'completed':
        return `Score: ${gameState.score.points}`;
      default:
        return '';
    }
  };

  return (
    <div className="glass-panel p-4 mb-4">
      <div className="flex items-center space-x-4">
        <Trophy className="text-yellow-400" size={24} />
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-sm text-gray-400">{getSubtitle()}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(GameHeader);
