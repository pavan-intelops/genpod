import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { ProjectStore } from './types'

export const useProjectStore = create<ProjectStore>()(
	devtools(
		persist(
			(set) => {
				return {
					activeProject: null,
					projects: [],
					setActiveProject: (project) => {
						set({ activeProject: project })
					},
					setProjects: (projects, replace = true) => {
						set({ projects }, replace)
					},
					removeProject: (project) => {
						set((state) => {
							const newProjects = state.projects.filter(
								(p) => p.id !== project.id
							)
							return { projects: newProjects }
						})
					},
				}
			},
			{
				name: 'user-project-store',
				partialize: (state) => {
					// only storing projects in localStorage
					return {
						projects: state.projects,
					}
				},
			}
		),
		{
			name: 'project-store',
		}
	)
)
