export interface TournamentPlayer {
  id: string;
  name: string;
  score: number;
  rank?: number;
  lastUpdated: number;
  avatarUrl?: string;
  isActive: boolean;
}

export interface TournamentReward {
  points: number;
  tokens: number;
  badge?: string;
}

export interface TournamentRewards {
  first: TournamentReward;
  second: TournamentReward;
  third: TournamentReward;
}

export interface TournamentStats {
  totalParticipants: number;
  averageScore: number;
  topScore: number;
  completionRate: number;
}

export interface Tournament {
  id: string;
  title: string;
  description: string;
  startTime: number;
  endTime: number;
  players: TournamentPlayer[];
  rewards: TournamentRewards;
  stats: TournamentStats;
  isActive: boolean;
  minPlayersRequired: number;
  maxPlayers?: number;
}

export type TournamentStatus = 'upcoming' | 'active' | 'completed';

export interface TournamentState {
  currentTournament: Tournament | null;
  history: Tournament[];
  lastUpdated: number;
}