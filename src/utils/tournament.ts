import { Tournament, TournamentPlayer, TournamentStatus } from '../types/tournament';

export const calculateTimeRemaining = (tournament: Tournament): {
  days: number;
  hours: number;
  minutes: number;
} => {
  const now = Date.now();
  const remaining = Math.max(0, tournament.endTime - now);

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes };
};

export const formatTimeRemaining = (tournament: Tournament): string => {
  const { days, hours, minutes } = calculateTimeRemaining(tournament);
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

export const calculateTournamentProgress = (tournament: Tournament): number => {
  const now = Date.now();
  const total = tournament.endTime - tournament.startTime;
  const elapsed = now - tournament.startTime;
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
};

export const sortPlayersByRank = (players: TournamentPlayer[]): TournamentPlayer[] => {
  return [...players].sort((a, b) => {
    // Sort by score first
    if (b.score !== a.score) return b.score - a.score;
    // If scores are equal, sort by last updated (most recent first)
    return b.lastUpdated - a.lastUpdated;
  });
};

export const getTournamentStatus = (tournament: Tournament): TournamentStatus => {
  const now = Date.now();
  if (now < tournament.startTime) return 'upcoming';
  if (now >= tournament.endTime) return 'completed';
  return 'active';
};

export const generateTournamentId = (): string => {
  return `tournament_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const formatTournamentDuration = (tournament: Tournament): string => {
  const duration = tournament.endTime - tournament.startTime;
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));
  return `${days} days`;
};

export const isEligibleForRewards = (player: TournamentPlayer): boolean => {
  return player.rank !== undefined && player.rank <= 3;
};

export const calculateRewardMultiplier = (rank: number): number => {
  switch (rank) {
    case 1:
      return 1.0; // 100% of base reward
    case 2:
      return 0.5; // 50% of base reward
    case 3:
      return 0.25; // 25% of base reward
    default:
      return 0;
  }
};