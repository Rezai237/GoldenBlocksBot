import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SponsorStore, initialState } from './types';
import { validateSponsor } from './validation';
import { isTaskExpired, isTaskComplete, sortTasksByReward, filterActiveTasks, capTaskProgress } from './utils';
import { createJSONStorage } from '../../utils/storage';

export const useSponsorStore = create<SponsorStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addSponsor: (sponsor) => {
        set((state) => {
          // Validate sponsor
          if (!validateSponsor(sponsor)) return state;
          if (state.sponsors.some(s => s.id === sponsor.id)) return state;

          // Prepare tasks with sponsor ID
          const tasks = sponsor.tasks.map(task => ({
            ...task,
            sponsorId: sponsor.id,
            completed: false
          }));

          return {
            ...state,
            sponsors: [...state.sponsors, { ...sponsor, tasks }],
            activeTasks: [...state.activeTasks, ...tasks]
          };
        });
      },

      removeSponsor: (sponsorId) => {
        set((state) => ({
          ...state,
          sponsors: state.sponsors.filter(s => s.id !== sponsorId),
          activeTasks: state.activeTasks.filter(t => t.sponsorId !== sponsorId)
        }));
      },

      updateTaskProgress: (taskId, progress) => {
        set((state) => {
          const taskIndex = state.activeTasks.findIndex(t => t.id === taskId);
          if (taskIndex === -1) return state;

          const task = state.activeTasks[taskIndex];
          if (task.completed || isTaskExpired(task)) return state;

          const newProgress = capTaskProgress(progress, task.requirements.target);
          const updatedTask = {
            ...task,
            requirements: {
              ...task.requirements,
              current: newProgress
            }
          };

          const updatedTasks = [...state.activeTasks];
          updatedTasks[taskIndex] = updatedTask;

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
          if (!isTaskComplete(task)) return state;

          const completedTask = { ...task, completed: true };
          
          return {
            ...state,
            activeTasks: state.activeTasks.filter((_, i) => i !== taskIndex),
            completedTasks: [...state.completedTasks, completedTask]
          };
        });
      },

      getActiveSponsorTasks: () => {
        const { activeTasks } = get();
        return sortTasksByReward(filterActiveTasks(activeTasks));
      }
    }),
    {
      name: 'sponsor-storage',
      storage: createJSONStorage(() => localStorage),
      version: 2,
      partialize: (state) => ({
        sponsors: state.sponsors,
        activeTasks: state.activeTasks,
        completedTasks: state.completedTasks
      }),
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...initialState,
            ...persistedState,
            activeTasks: persistedState.activeTasks?.map((task: any) => ({
              ...task,
              completed: false
            })) || []
          };
        }
        if (version === 1) {
          return {
            ...persistedState,
            sponsors: persistedState.sponsors || [],
            activeTasks: persistedState.activeTasks || [],
            completedTasks: persistedState.completedTasks || []
          };
        }
        return persistedState;
      }
    }
  )
);