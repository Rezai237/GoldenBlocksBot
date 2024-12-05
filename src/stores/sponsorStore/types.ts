import { Sponsor, SponsorTask } from '../../types/sponsor';

export interface SponsorState {
  sponsors: Sponsor[];
  activeTasks: SponsorTask[];
  completedTasks: SponsorTask[];
}

export interface SponsorActions {
  addSponsor: (sponsor: Sponsor) => void;
  removeSponsor: (sponsorId: string) => void;
  updateTaskProgress: (taskId: string, progress: number) => void;
  completeTask: (taskId: string) => void;
  getActiveSponsorTasks: () => SponsorTask[];
}

export type SponsorStore = SponsorState & SponsorActions;

export const initialState: SponsorState = {
  sponsors: [],
  activeTasks: [],
  completedTasks: []
};