import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TournamentStore } from './types';
import { INITIAL_STATE } from './constants';
import { createWeeklyTournament, calculateUpdatedStats } from './utils';

export const useTournamentStore = create<TournamentStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      initializeWeeklyTournament: () => {
        const tournament = createWeeklyTournament();
        set({ currentTournament: tournament });
        return tournament;
      },

      getRankings: () => {
        const { currentTournament } = get();
        if (!currentTournament?.players) return [];
        
        return currentTournament.players
          .filter(player => player.isActive)
          .sort((a, b) => b.score - a.score)
          .map((player, index) => ({
            ...player,
            rank: index + 1
          }));
      },

      addPlayer: (player) => {
        set((state) => {
          if (!state.currentTournament) return state;

          const players = state.currentTournament.players || [];
          const existingPlayer = players.find(p => p.id === player.id);
          if (existingPlayer) return state;

          const updatedPlayers = [...players, player];
          const updatedStats = calculateUpdatedStats(updatedPlayers);

          return {
            currentTournament: {
              ...state.currentTournament,
              players: updatedPlayers,
              stats: updatedStats
            }
          };
        });
      },

      updatePlayerScore: (playerId, score) => {
        set((state) => {
          if (!state.currentTournament?.players) return state;

          const updatedPlayers = state.currentTournament.players.map(player =>
            player.id === playerId
              ? { ...player, score, lastUpdated: Date.now() }
              : player
          );

          const updatedStats = calculateUpdatedStats(updatedPlayers);

          return {
            currentTournament: {
              ...state.currentTournament,
              players: updatedPlayers,
              stats: updatedStats
            }
          };
        });
      },

      endTournament: () => {
        const { currentTournament } = get();
        if (!currentTournament) return null;

        const endedTournament = {
          ...currentTournament,
          isActive: false,
          endTime: Date.now()
        };

        set({
          currentTournament: null,
          history: [endedTournament, ...get().history],
          rankings: []
        });

        return endedTournament;
      },

      clearNotifications: () => {
        set({ notifications: [] });
      }
    }),
    {
      name: 'tournament-storage',
      partialize: (state) => ({
        currentTournament: state.currentTournament,
        history: state.history,
        rankings: state.rankings
      })
    }
  )
);