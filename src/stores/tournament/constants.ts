export const DEFAULT_REWARDS = {
  first: {
    points: 100000,
    tokens: 10,
    badge: '🏆'
  },
  second: {
    points: 50000,
    tokens: 5,
    badge: '🥈'
  },
  third: {
    points: 25000,
    tokens: 2.5,
    badge: '🥉'
  }
};

export const DEFAULT_STATS = {
  totalParticipants: 0,
  averageScore: 0,
  topScore: 0,
  completionRate: 0
};

export const INITIAL_STATE = {
  currentTournament: null,
  rankings: [],
  history: [],
  notifications: []
};