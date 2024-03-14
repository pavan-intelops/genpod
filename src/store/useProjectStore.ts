import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ProjectStore } from './types';

export const useProjectStore = create<ProjectStore>()(
  devtools(
    persist(
      set => {
        return {
          _hasHydrated: false,
          _setHasHydrated: hasHydrated => {
            set({ _hasHydrated: hasHydrated });
          },
          activeProject: null,
          projects: [],
          setActiveProject: projectId => {
            set(state => {
              const activeProject = state.projects.find(
                p => p.id === projectId
              );
              return { activeProject };
            });
          },
          setProjects: (projects, replace = true) => {
            set({ projects }, replace);
          },
          removeProject: project => {
            set(state => {
              const newProjects = state.projects.filter(
                p => p.id !== project.id
              );
              return { projects: newProjects };
            });
          }
        };
      },
      {
        name: 'user-project-store',
        onRehydrateStorage: () => state => {
          if (state) state._setHasHydrated(true);
        }
      }
    ),
    {
      name: 'project-store'
    }
  )
);
