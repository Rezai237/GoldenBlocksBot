import { Sponsor, SponsorTask } from '../../types/sponsor';

export const validateSponsor = (sponsor: Sponsor): boolean => {
  if (!sponsor) return false;
  
  return (
    typeof sponsor.id === 'string' &&
    typeof sponsor.name === 'string' &&
    typeof sponsor.logo === 'string' &&
    typeof sponsor.description === 'string' &&
    Array.isArray(sponsor.tasks) &&
    sponsor.tasks.every(validateTask)
  );
};

export const validateTask = (task: SponsorTask): boolean => {
  if (!task) return false;

  return (
    typeof task.id === 'string' &&
    typeof task.sponsorId === 'string' &&
    typeof task.title === 'string' &&
    typeof task.description === 'string' &&
    validateTaskRequirements(task.requirements) &&
    validateTaskReward(task.reward) &&
    typeof task.expiresAt === 'number'
  );
};

const validateTaskRequirements = (requirements: SponsorTask['requirements']): boolean => {
  if (!requirements) return false;

  return (
    typeof requirements.type === 'string' &&
    typeof requirements.target === 'number' &&
    typeof requirements.current === 'number' &&
    requirements.target > 0 &&
    requirements.current >= 0
  );
};

const validateTaskReward = (reward: SponsorTask['reward']): boolean => {
  if (!reward) return false;

  return (
    typeof reward.tokens === 'number' &&
    typeof reward.points === 'number' &&
    reward.tokens >= 0 &&
    reward.points >= 0
  );
};