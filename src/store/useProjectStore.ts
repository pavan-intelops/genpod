import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ProjectStoreActions, ProjectStoreState } from './types';

export const useProjectStore = create<
  ProjectStoreState & ProjectStoreActions
>()(
  devtools(
    persist(
      immer((set, get) => {
        return {
          activeProject: null,
          projects: [],
          setActiveProject: projectId => {
            if (!projectId) return set({ activeProject: null });
            const activeProject = get().projects.find(p => p.id == projectId);
            return set({ activeProject });
          },
          setProjects: projects => {
            set({ projects });
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
      }),
      {
        name: 'project-store',
        partialize: (state: ProjectStoreState) => {
          return {
            activeProject: state.activeProject,
            projects: state.projects
          };
        }
      }
    ),
    {
      name: 'project-store'
    }
  )
);
