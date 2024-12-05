import { motion } from 'framer-motion';
import { Puzzle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { hapticFeedback } from '../utils/telegram';

const Games = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 'puzzle',
      title: 'Sliding Puzzle',
      description: 'Classic sliding puzzle game',
      icon: Puzzle,
      color: 'from-yellow-400 to-orange-500',
      path: '/games/puzzle'
    }
  ];

  const handleGameSelect = (path: string) => {
    hapticFeedback.impact('light');
    navigate(path);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20 px-4"
    >
      <div className="glass-panel p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500">
            <Puzzle size={24} className="text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Games</h1>
            <p className="text-gray-400">Choose a game to play</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {games.map((game) => (
          <motion.button
            key={game.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleGameSelect(game.path)}
            className="w-full glass-panel p-4 text-left"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${game.color}`}>
                <game.icon size={24} className="text-black" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{game.title}</h3>
                <p className="text-sm text-gray-400">{game.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Games;
