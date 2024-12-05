import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Sponsor, SponsorTask } from '../types/sponsor';

interface SponsorState {
  sponsors: Sponsor[];
  activeTasks: SponsorTask[];
  completedTasks: SponsorTask[];
  // Actions
  addSponsor: (sponsor: Sponsor) => void;
  removeSponsor: (sponsorId: string) => void;
  updateTaskProgress: (taskId: string, progress: number) => void;
  completeTask: (taskId: string) => void;
  getActiveSponsorTasks: () => SponsorTask[];
}

const initialState = {
  sponsors: [],
  activeTasks: [],
  completedTasks: []
};

export const useSponsorStore = create<SponsorState>()(
  persist(
    (set, get) => ({
      ...initialState,

      addSponsor: (sponsor) => {
        set((state) => {
          // Check if sponsor already exists
          if (state.sponsors.some(s => s.id === sponsor.id)) {
            return state;
          }

          return {
            sponsors: [...state.sponsors, sponsor],
            activeTasks: [...state.activeTasks, ...sponsor.tasks]
          };
        });
      },

      removeSponsor: (sponsorId) => {
        set((state) => ({
          sponsors: state.sponsors.filter(s => s.id !== sponsorId),
          activeTasks: state.activeTasks.filter(t => t.sponsorId !== sponsorId)
        }));
      },

      updateTaskProgress: (taskId, progress) => {
        set((state) => {
          const taskIndex = state.activeTasks.findIndex(t => t.id === taskId);
          if (taskIndex === -1) return state;

          const task = state.activeTasks[taskIndex];
          if (task.completed) return state;

          const newProgress = Math.min(progress, task.requirements.target);
          const updatedTasks = [...state.activeTasks];
          updatedTasks[taskIndex] = {
            ...task,
            requirements: {
              ...task.requirements,
              current: newProgress
            }
          };

          return {
            ...state,
            activeTasks: updatedTasks
          };
        });
      },

      completeTask: (taskId) => {
        set((state) => {
          const taskIndex = state.activeTasks.findIndex(t => t.id === taskId);
          if (taskIndex === -1) return state;

          const task = state.activeTasks[taskIndex];
          const updatedActiveTasks = state.activeTasks.filter((_, i) => i !== taskIndex);
          const updatedCompletedTasks = [...state.completedTasks, { ...task, completed: true }];

          return {
            ...state,
            activeTasks: updatedActiveTasks,
            completedTasks: updatedCompletedTasks
          };
        });
      },

      getActiveSponsorTasks: () => {
        const { activeTasks } = get();
        const now = Date.now();
        
        return activeTasks
          .filter(task => task.expiresAt > now)
          .sort((a, b) => b.reward.tokens - a.reward.tokens);
      }
    }),
    {
      name: 'sponsor-storage',
      partialize: (state) => ({
        sponsors: state.sponsors,
        activeTasks: state.activeTasks,
        completedTasks: state.completedTasks
      })
    }
  )
);