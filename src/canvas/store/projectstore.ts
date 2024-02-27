import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { ProjectStore } from './types.store'

export const useProjectStore = create<ProjectStore>()(
	devtools((set, get) => {
		return {
			projects: {},
			setProjects: (projects) => {
				set({
					projects,
				})
			},
			addProject: (projectKey: string, project) => {
				set((state) => {
					const projects = { ...state.projects }
					projects[projectKey] = project
					return {
						projects,
					}
				})
			},
			updateProject: (projectKey: string, project) => {
				set((state) => {
					const projects = { ...state.projects }
					projects[projectKey] = project
					return {
						projects,
					}
				})
			},
			deleteProject: (projectKey: string) => {
				set((state) => {
					const projects = { ...state.projects }
					delete projects[projectKey]
					return {
						projects,
					}
				})
			},
		}
	})
)
