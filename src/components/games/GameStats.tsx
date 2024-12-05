import { motion } from 'framer-motion';
import { GameScore } from '../../types/game';
import ScoreBreakdown from './score/breakdown/ScoreBreakdown';

interface Props {
  score: GameScore;
  onPlayAgain: () => void;
}

const GameStats = ({ score, onPlayAgain }: Props) => {
  console.log('Rendering GameStats with score:', score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="glass-panel p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Game Complete!</h2>
        <div className="text-4xl font-bold text-yellow-400 mb-4">
          {score.points}
        </div>
        <div className="text-sm text-gray-400">
          Completed in {score.moves} moves and {Math.round(score.time)}s
        </div>
        {score.perfect && (
          <div className="mt-2 text-sm text-yellow-400">Perfect Game! 🌟</div>
        )}
        {(score.streak ?? 0) > 1 && (
          <div className="mt-2 text-sm text-blue-400">
            {score.streak}x Streak! 🔥
          </div>
        )}
      </div>

      <ScoreBreakdown score={score} />

      <button
        onClick={() => {
          console.log('Play Again clicked');
          onPlayAgain();
        }}
        className="w-full p-4 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold active:scale-98"
      >
        Play Again
      </button>

      {import.meta.env.DEV && (
        <div className="text-xs text-gray-500 text-center">
          Debug Info: {JSON.stringify(score, null, 2)}
        </div>
      )}
    </motion.div>
  );
};

export default GameStats;
