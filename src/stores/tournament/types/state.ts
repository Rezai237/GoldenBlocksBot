import { Tournament, TournamentPlayer } from '../../../types/tournament';

export interface TournamentState {
  currentTournament: Tournament | null;
  rankings: TournamentPlayer[];
  history: Tournament[];
  notifications: string[];
}

export interface TournamentActions {
  initializeWeeklyTournament: () => Tournament;
  getRankings: () => TournamentPlayer[];
  addPlayer: (player: TournamentPlayer) => void;
  updatePlayerScore: (playerId: string, score: number) => void;
  endTournament: () => Tournament | null;
  clearNotifications: () => void;
}

export type TournamentStore = TournamentState & TournamentActions;