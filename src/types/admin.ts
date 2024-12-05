import { GameType } from './game';

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalGamesPlayed: number;
  averagePlayTime: number;
  achievementProgress: number;
}

export interface GameAnalytics {
  id: string;
  type: GameType;
  totalPlays: number;
  averageScore: number;
  averageTime: number;
  completionRate: number;
}

export interface UserActivity {
  userId: string;
  username: string;
  lastActive: number;
  totalGamesPlayed: number;
  favoriteGame: GameType;
  achievements: number;
}

export interface AdminDashboardData {
  stats: AdminStats;
  gameAnalytics: GameAnalytics[];
  userActivity: UserActivity[];
}
