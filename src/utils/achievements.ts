import { Achievement } from '../types/achievement';
import { GameScore } from '../types/game';

export const createGameAchievements = (gameType: 'puzzle'): Achievement[] => {
  console.log('Creating game achievements for:', gameType);
  
  const baseAchievements: Achievement[] = [
    {
      id: `${gameType}_first_win`,
      title: 'First Victory',
      description: 'Win your first game',
      icon: '🎮',
      tier: 'bronze',
      points: 100,
      target: 1,
      progress: 0,
      isUnlocked: false
    },
    {
      id: `${gameType}_master`,
      title: 'Puzzle Master',
      description: 'Score over 5000 points in a single game',
      icon: '🏆',
      tier: 'gold',
      points: 500,
      target: 5000,
      progress: 0,
      isUnlocked: false
    },
    {
      id: `${gameType}_streak`,
      title: 'Streak Master',
      description: 'Achieve a 10x streak',
      icon: '🔥',
      tier: 'silver',
      points: 300,
      target: 10,
      progress: 0,
      isUnlocked: false
    },
    {
      id: `${gameType}_speed_demon`,
      title: 'Speed Demon',
      description: 'Complete a game in under 30 seconds',
      icon: '⚡️',
      tier: 'gold',
      points: 750,
      target: 1,
      progress: 0,
      isUnlocked: false
    },
    {
      id: `${gameType}_daily_player`,
      title: 'Daily Player',
      description: 'Play 5 games in a day',
      icon: '📅',
      tier: 'silver',
      points: 250,
      target: 5,
      progress: 0,
      isUnlocked: false
    },
    {
      id: 'puzzle_efficient',
      title: 'Efficiency Expert',
      description: 'Complete a puzzle in under 20 moves',
      icon: '🎯',
      tier: 'gold',
      points: 800,
      target: 1,
      progress: 0,
      isUnlocked: false
    },
    {
      id: 'puzzle_strategist',
      title: 'Master Strategist',
      description: 'Complete 3 puzzles without undoing moves',
      icon: '🧩',
      tier: 'silver',
      points: 450,
      target: 3,
      progress: 0,
      isUnlocked: false
    }
  ];

  console.log('Created achievements:', baseAchievements);
  return baseAchievements;
};

export const updateAchievements = (
  gameType: 'puzzle',
  score: GameScore,
  achievements: Achievement[]
): Achievement[] => {
  console.log('Updating achievements with score:', score);
  
  try {
    // Get daily games count from storage
    const today = new Date().toDateString();
    const dailyGames = JSON.parse(localStorage.getItem(`${gameType}_daily_games`) || '{}');
    const todayGames = (dailyGames[today] || 0) + 1;
    dailyGames[today] = todayGames;
    localStorage.setItem(`${gameType}_daily_games`, JSON.stringify(dailyGames));

    const updatedAchievements = achievements.map(achievement => {
      let progress = achievement.progress;
      let shouldUpdate = false;

      switch (achievement.id) {
        case `${gameType}_first_win`:
          if (score.points > 0 && !achievement.isUnlocked) {
            progress = 1;
            shouldUpdate = true;
          }
          break;
        case `${gameType}_master`:
          if (score.points > progress) {
            progress = score.points;
            shouldUpdate = true;
          }
          break;
        case `${gameType}_streak`:
          if ((score.streak || 0) > progress) {
            progress = score.streak || 0;
            shouldUpdate = true;
          }
          break;
        case `${gameType}_speed_demon`:
          if (score.time <= 30 && !achievement.isUnlocked) {
            progress = 1;
            shouldUpdate = true;
          }
          break;
        case `${gameType}_daily_player`:
          if (todayGames > progress) {
            progress = Math.min(achievement.target, todayGames);
            shouldUpdate = true;
          }
          break;
        case 'puzzle_efficient':
          if (score.moves <= 20 && !achievement.isUnlocked) {
            progress = 1;
            shouldUpdate = true;
          }
          break;
        case 'puzzle_strategist':
          if (!score.undoUsed && !achievement.isUnlocked) {
            progress = Math.min(achievement.target, progress + 1);
            shouldUpdate = true;
          }
          break;
      }

      if (!shouldUpdate) {
        return achievement;
      }

      const isUnlocked = progress >= achievement.target;
      if (isUnlocked && !achievement.isUnlocked) {
        console.log('Achievement unlocked:', achievement.title);
        // Dispatch achievement unlocked event
        const event = new CustomEvent('achievementUnlocked', {
          detail: { ...achievement, progress, isUnlocked }
        });
        window.dispatchEvent(event);
      }

      return {
        ...achievement,
        progress,
        isUnlocked
      };
    });

    console.log('Updated achievements:', updatedAchievements);
    return updatedAchievements;
  } catch (error) {
    console.error('Error updating achievements:', error);
    return achievements;
  }
};

export const getAchievementProgress = (achievement: Achievement): number => {
  return Math.min(1, achievement.progress / achievement.target) * 100;
};

export const formatAchievementProgress = (achievement: Achievement): string => {
  if (achievement.isUnlocked) return 'Completed!';
  return `${achievement.progress}/${achievement.target}`;
};
