import WebApp from '@twa-dev/sdk';
import { MainButton, BackButton, HapticFeedback, TelegramWebApp } from '../types/telegram';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  language_code?: string;
}

const MOCK_USER: TelegramUser = {
  id: 12345,
  first_name: 'Test',
  last_name: 'User',
  username: 'testuser',
  language_code: 'en',
  photo_url: 'https://via.placeholder.com/100'
};

export const getTelegramUser = (): TelegramUser | null => {
  try {
    // For development environment
    if (import.meta.env.DEV) {
      console.log('Development mode: Returning mock user');
      return MOCK_USER;
    }

    const webApp = window.Telegram?.WebApp;
    if (!webApp?.initDataUnsafe?.user) {
      console.log('No Telegram WebApp user found');
      return null;
    }

    return webApp.initDataUnsafe.user;
  } catch (error) {
    console.warn('Failed to get Telegram user:', error);
    return null;
  }
};

export const initializeTelegramWebApp = () => {
  try {
    console.log('Initializing Telegram WebApp...');
    
    // For development environment
    if (import.meta.env.DEV) {
      console.log('Development mode: Setting up mock Telegram WebApp');
      
      const mockMainButton: MainButton = {
        text: 'Mock Button',
        color: '#000000' as `#${string}`,
        textColor: '#ffffff' as `#${string}`,
        isVisible: false,
        isActive: true,
        isProgressVisible: false,
        show: () => { mockMainButton.isVisible = true; },
        hide: () => { mockMainButton.isVisible = false; },
        setText: (text: string) => { mockMainButton.text = text; },
        onClick: () => {},
        offClick: () => {},
        enable: () => { mockMainButton.isActive = true; },
        disable: () => { mockMainButton.isActive = false; },
        showProgress: () => { mockMainButton.isProgressVisible = true; },
        hideProgress: () => { mockMainButton.isProgressVisible = false; },
        setParams: (params) => {
          if (params.text) mockMainButton.text = params.text;
          if (params.color) mockMainButton.color = params.color as `#${string}`;
          if (params.text_color) mockMainButton.textColor = params.text_color as `#${string}`;
          if (params.is_active !== undefined) mockMainButton.isActive = params.is_active;
          if (params.is_visible !== undefined) mockMainButton.isVisible = params.is_visible;
        }
      };

      const mockBackButton: BackButton = {
        isVisible: false,
        show: () => { mockBackButton.isVisible = true; },
        hide: () => { mockBackButton.isVisible = false; },
        onClick: () => {},
        offClick: () => {}
      };

      const mockHapticFeedback: HapticFeedback = {
        impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => {
          console.log('Mock haptic impact:', style);
          return mockHapticFeedback;
        },
        notificationOccurred: (type: 'error' | 'success' | 'warning') => {
          console.log('Mock haptic notification:', type);
          return mockHapticFeedback;
        },
        selectionChanged: () => {
          console.log('Mock haptic selection');
          return mockHapticFeedback;
        }
      };

      window.Telegram = {
        WebApp: {
          ...WebApp,
          ready: () => {
            console.log('Mock WebApp ready called');
          },
          expand: () => {
            console.log('Mock WebApp expand called');
          },
          close: () => {
            console.log('Mock WebApp close called');
          },
          MainButton: mockMainButton,
          BackButton: mockBackButton,
          HapticFeedback: mockHapticFeedback,
          isExpanded: true,
          viewportHeight: window.innerHeight,
          viewportStableHeight: window.innerHeight,
          colorScheme: 'dark',
          initDataUnsafe: {
            user: MOCK_USER,
            query_id: '12345',
            start_param: 'test',
            auth_date: Date.now(),
            hash: 'mock_hash'
          }
        }
      };
      return;
    }

    const webApp = window.Telegram?.WebApp;
    if (!webApp) {
      throw new Error('Telegram WebApp is not available');
    }

    webApp.ready();
    webApp.expand();

    // Set up viewport height fix for mobile browsers
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setViewportHeight);
    setViewportHeight();

    return () => window.removeEventListener('resize', setViewportHeight);
  } catch (error) {
    console.error('Failed to initialize Telegram WebApp:', error);
    if (import.meta.env.DEV) {
      // In development, continue despite errors
      console.log('Continuing in development mode despite WebApp initialization error');
      return;
    }
    throw error; // Re-throw in production
  }
};

export const hapticFeedback = {
  impact(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') {
    try {
      window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(style);
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  },
  notification(type: 'error' | 'success' | 'warning') {
    try {
      window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred(type);
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  },
  selection() {
    try {
      window.Telegram?.WebApp?.HapticFeedback?.selectionChanged();
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }
};
