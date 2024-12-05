import { Tournament, TournamentPlayer } from '../../types/tournament';
import { DEFAULT_REWARDS, DEFAULT_STATS } from './constants';
import { TournamentState, TournamentActions } from './types/state';
import { createWeeklyTournament, createEndedTournament } from './utils/tournament';
import { StateCreator } from 'zustand';

export const createActions = (
  set: Parameters<StateCreator<TournamentState & TournamentActions>>[0],
  get: () => TournamentState & TournamentActions
): TournamentActions => ({
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

  addPlayer: (player: TournamentPlayer) => {
    set((state) => {
      if (!state.currentTournament) return state;

      const players = state.currentTournament.players || [];
      const existingPlayer = players.find(p => p.id === player.id);
      if (existingPlayer) return state;

      const updatedPlayers = [...players, player];
      const updatedStats = {
        ...state.currentTournament.stats,
        totalParticipants: updatedPlayers.length
      };

      return {
        currentTournament: {
          ...state.currentTournament,
          players: updatedPlayers,
          stats: updatedStats
        }
      };
    });
  },

  updatePlayerScore: (playerId: string, score: number) => {
    set((state) => {
      if (!state.currentTournament?.players) return state;

      const updatedPlayers = state.currentTournament.players.map(player =>
        player.id === playerId
          ? { ...player, score, lastUpdated: Date.now() }
          : player
      );

      const scores = updatedPlayers.map(p => p.score);
      const updatedStats = {
        ...state.currentTournament.stats,
        topScore: Math.max(...scores, 0),
        averageScore: scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
      };

      return {
        currentTournament: {
          ...state.currentTournament,
          players: updatedPlayers,
          stats: updatedStats
        }
      };
    });
  },

  initializeWeeklyTournament: () => {
    const tournament = createWeeklyTournament();
    set({ currentTournament: tournament });
    return tournament;
  },

  endTournament: () => {
    const { currentTournament } = get();
    if (!currentTournament) return null;

    const endedTournament = createEndedTournament(currentTournament);

    set(state => ({
      currentTournament: null,
      history: [endedTournament, ...state.history],
      rankings: []
    }));

    return endedTournament;
  },

  clearNotifications: () => {
    set({ notifications: [] });
  }
});