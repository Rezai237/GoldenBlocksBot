import { useState, useEffect } from 'react';
import { Achievement } from '../types/achievement';

export const useAchievementNotification = () => {
  const [unlockedAchievement, setUnlockedAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    const handleAchievementUnlock = (event: CustomEvent<Achievement>) => {
      setUnlockedAchievement(event.detail);
    };

    window.addEventListener('achievementUnlocked', handleAchievementUnlock as EventListener);

    return () => {
      window.removeEventListener('achievementUnlocked', handleAchievementUnlock as EventListener);
    };
  }, []);

  const clearAchievement = () => {
    setUnlockedAchievement(null);
  };

  return {
    unlockedAchievement,
    clearAchievement
  };
};