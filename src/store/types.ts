export interface GitPlatform {
	gitPlatform: string
	personalAccessToken: string
	url: string
	username: string
}
export interface UserStore {
	gitPlatforms: GitPlatform[]
	setGitPlatforms: (
		gitPlatforms: GitPlatform | GitPlatform[],
		append?: boolean
	) => void
}
