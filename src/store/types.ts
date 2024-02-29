import { Project } from 'src/components/user/projects/types'

export interface GitPlatform {
	gitPlatform: string
	personalAccessToken: string
	url: string
	username: string
}
export interface UserStore {
	gitPlatformStore: GitPlatformStore
	personalDetails: PersonalDetails
	setPersonalDetails: (personalDetails: PersonalDetails) => void
	isUserLoggedIn: () => boolean
	logout: () => void
}

export interface PersonalDetails {
	email: string
}
export interface GitPlatformStore {
	gitPlatforms: GitPlatform[]
	setGitPlatforms: (
		gitPlatforms: GitPlatform | GitPlatform[],
		append?: boolean
	) => void
	removeGitPlatform: (gitPlatform: GitPlatform) => void
}

export interface ProjectStore {
	projects: Project[]
	activeProject: Project | null
	setProjects: (projects: Project[], replace?: boolean) => void
	setActiveProject: (projectId: string) => void
	removeProject: (project: Project) => void
}
