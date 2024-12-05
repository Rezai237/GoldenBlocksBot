import { SponsorTask } from '../../types/sponsor';

export const isTaskExpired = (task: SponsorTask): boolean => {
  return Date.now() > task.expiresAt;
};

export const getTaskProgress = (task: SponsorTask): number => {
  return (task.requirements.current / task.requirements.target) * 100;
};

export const isTaskComplete = (task: SponsorTask): boolean => {
  return task.requirements.current >= task.requirements.target;
};

export const sortTasksByReward = (tasks: SponsorTask[]): SponsorTask[] => {
  return [...tasks].sort((a, b) => b.reward.tokens - a.reward.tokens);
};

export const filterActiveTasks = (tasks: SponsorTask[]): SponsorTask[] => {
  return tasks.filter(task => !isTaskExpired(task) && !task.completed);
};

export const capTaskProgress = (progress: number, target: number): number => {
  return Math.min(Math.max(0, progress), target);
};