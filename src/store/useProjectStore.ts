import { create } from 'zustand';
import { ProjectStoreActions, ProjectStoreState } from './types';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useProjectStore = create<
  ProjectStoreState & ProjectStoreActions
>()(
  devtools(
    immer((set, get) => {
      return {
        activeProject: null,
        projects: [],
        setActiveProject: projectId => {
          if (!projectId) return set({ activeProject: null });
          const activeProject = get().projects.find(p => p.id === projectId);
          return set({ activeProject });
        },
        setProjects: projects => {
          set({ projects });
        },
        removeProject: project => {
          set(state => {
            const newProjects = state.projects.filter(p => p.id !== project.id);
            return { projects: newProjects };
          });
        }
      };
    }),
    {
      name: 'project-store'
    }
  )
);
