import { initialState, initialStreak } from '../types';
import { createInitialRewards } from './rewards';

export const createCustomStorage = () => ({
  getItem: (name: string) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    
    try {
      const data = JSON.parse(str);
      return {
        ...data,
        state: {
          ...data.state,
          rewards: data.state.rewards || createInitialRewards(data.state.streak || initialStreak),
          streak: {
            ...initialStreak,
            ...data.state.streak
          },
          lastUpdated: data.state.lastUpdated || Date.now()
        }
      };
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: unknown) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  }
});