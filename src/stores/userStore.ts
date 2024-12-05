import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '../types/user';
import { getTelegramUser } from '../utils/telegram';

interface UserState {
  user: UserProfile | null;
  initialized: boolean;
  // Actions
  initializeUser: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  updateLastActive: () => void;
  isAdmin: () => boolean;
}

const createMockUser = (): UserProfile => ({
  id: 'user_12345',
  telegramId: 12345,
  firstName: 'Test',
  lastName: 'User',
  username: 'testuser',
  photoUrl: 'https://via.placeholder.com/100',
  languageCode: 'en',
  joinedAt: Date.now(),
  lastActive: Date.now(),
  isAdmin: true
});

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      initialized: false,

      initializeUser: () => {
        console.log('Initializing user...');

        // Always use mock user in development
        if (import.meta.env.DEV) {
          console.log('Development mode: Creating mock user');
          const mockUser = createMockUser();
          set({ user: mockUser, initialized: true });
          return;
        }

        const telegramUser = getTelegramUser();
        console.log('Telegram user:', telegramUser);
        
        if (!telegramUser) {
          console.log('No Telegram user found');
          set({ initialized: true });
          return;
        }

        // If user exists, just update last active
        if (get().user?.telegramId === telegramUser.id) {
          console.log('Existing user found, updating last active');
          get().updateLastActive();
          set({ initialized: true });
          return;
        }

        // Create new user profile
        console.log('Creating new user profile');
        const userProfile: UserProfile = {
          id: `user_${telegramUser.id}`,
          telegramId: telegramUser.id,
          firstName: telegramUser.first_name,
          lastName: telegramUser.last_name,
          username: telegramUser.username,
          photoUrl: telegramUser.photo_url,
          languageCode: telegramUser.language_code,
          joinedAt: Date.now(),
          lastActive: Date.now(),
          isAdmin: telegramUser.id === 12345 // Replace with your admin ID
        };

        set({ user: userProfile, initialized: true });
      },

      updateUser: (updates) => {
        const { user } = get();
        if (!user) return;

        set({
          user: {
            ...user,
            ...updates,
            lastActive: Date.now()
          }
        });
      },

      updateLastActive: () => {
        const { user } = get();
        if (!user) return;

        set({
          user: {
            ...user,
            lastActive: Date.now()
          }
        });
      },

      isAdmin: () => {
        const { user } = get();
        return user?.isAdmin ?? false;
      }
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user
      })
    }
  )
);
