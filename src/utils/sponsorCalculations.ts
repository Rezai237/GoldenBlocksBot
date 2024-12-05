import { SponsorTask } from '../types/sponsor';

export const generateTaskId = (): string => {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const isTaskExpired = (task: SponsorTask): boolean => {
  return Date.now() > task.expiresAt;
};

export const calculateTaskProgress = (task: SponsorTask): number => {
  return Math.min(1, task.requirements.current / task.requirements.target) * 100;
};

export const sortTasksByReward = (tasks: SponsorTask[]): SponsorTask[] => {
  return [...tasks].sort((a, b) => b.reward.tokens - a.reward.tokens);
};