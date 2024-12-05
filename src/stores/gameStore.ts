import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { GameScore, GameType } from '../types/game';

interface GameRecord {
  id: string;
  type: GameType;
  score: GameScore;
  date: number;
}

interface GameStats {
  bestScore: number;
  averageScore: number;
  totalGames: number;
  bestStreak: number;
  lastUpdated: number;
}

interface GameState {
  bestRecords: GameRecord[];
  gameStats: Record<GameType, GameStats>;
  addGameRecord: (record: Omit<GameRecord, 'id' | 'date'>) => void;
  getBestRecords: (limit?: number) => GameRecord[];
  getGameStats: (gameType: GameType) => GameStats;
  clearRecords: () => void;
}

const createEmptyStats = (): GameStats => ({
  bestScore: 0,
  averageScore: 0,
  totalGames: 0,
  bestStreak: 0,
  lastUpdated: Date.now()
});

const calculateGameStats = (records: GameRecord[], gameType: GameType): GameStats => {
  const typeRecords = records.filter(r => r.type === gameType);
  
  if (typeRecords.length === 0) {
    return createEmptyStats();
  }

  const totalScore = typeRecords.reduce((sum, r) => sum + r.score.points, 0);
  const bestStreak = Math.max(...typeRecords.map(r => r.score.streak || 0));

  return {
    bestScore: typeRecords[0].score.points,
    averageScore: Math.round(totalScore / typeRecords.length),
    totalGames: typeRecords.length,
    bestStreak,
    lastUpdated: Date.now()
  };
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      bestRecords: [],
      gameStats: {
        puzzle: createEmptyStats()
      },

      addGameRecord: (record) => {
        const newRecord: GameRecord = {
          id: `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          date: Date.now(),
          ...record
        };

        set((state) => {
          const newRecords = [...state.bestRecords, newRecord]
            .sort((a, b) => b.score.points - a.score.points)
            .slice(0, 100);

          const newStats = calculateGameStats(newRecords, record.type);

          return {
            bestRecords: newRecords,
            gameStats: {
              ...state.gameStats,
              [record.type]: newStats
            }
          };
        });
      },

      getBestRecords: (limit = 10) => {
        const { bestRecords } = get();
        return bestRecords
          .sort((a, b) => b.score.points - a.score.points)
          .slice(0, limit);
      },

      getGameStats: (gameType) => {
        const { gameStats, bestRecords } = get();
        const stats = gameStats[gameType];

        if (Date.now() - stats.lastUpdated > 5 * 60 * 1000) {
          const newStats = calculateGameStats(bestRecords, gameType);
          set(state => ({
            gameStats: {
              ...state.gameStats,
              [gameType]: newStats
            }
          }));
          return newStats;
        }

        return stats;
      },

      clearRecords: () => {
        set({
          bestRecords: [],
          gameStats: {
            puzzle: createEmptyStats()
          }
        });
      }
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({
        bestRecords: state.bestRecords
      })
    }
  )
);
