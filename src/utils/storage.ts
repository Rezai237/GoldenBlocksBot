import { PersistStorage, StorageValue } from 'zustand/middleware';

export const createJSONStorage = <T>(getStorage: () => Storage): PersistStorage<T> => ({
  getItem: (name: string) => {
    try {
      const storage = getStorage();
      const value = storage.getItem(name);
      return value ? (JSON.parse(value) as StorageValue<T>) : null;
    } catch (error) {
      console.warn('Storage access failed:', error);
      return null;
    }
  },
  
  setItem: (name: string, value: StorageValue<T>) => {
    try {
      const storage = getStorage();
      storage.setItem(name, JSON.stringify(value));
    } catch (error) {
      console.warn('Storage write failed:', error);
    }
  },
  
  removeItem: (name: string) => {
    try {
      const storage = getStorage();
      storage.removeItem(name);
    } catch (error) {
      console.warn('Storage remove failed:', error);
    }
  }
});

// Helper to safely parse stored JSON
export const parseStoredState = <T>(storedState: string | null, fallback: T): T => {
  if (!storedState) return fallback;
  try {
    return JSON.parse(storedState) as T;
  } catch (error) {
    console.warn('Failed to parse stored state:', error);
    return fallback;
  }
};
