export const createJSONStorage = (getStorage: () => Storage) => ({
  getItem: (name: string): string | null => {
    try {
      const storage = getStorage();
      return storage.getItem(name);
    } catch (error) {
      console.warn('Storage access failed:', error);
      return null;
    }
  },
  
  setItem: (name: string, value: string): void => {
    try {
      const storage = getStorage();
      storage.setItem(name, value);
    } catch (error) {
      console.warn('Storage write failed:', error);
    }
  },
  
  removeItem: (name: string): void => {
    try {
      const storage = getStorage();
      storage.removeItem(name);
    } catch (error) {
      console.warn('Storage remove failed:', error);
    }
  }
});