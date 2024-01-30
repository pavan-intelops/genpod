import { ComboboxData } from '@mantine/core'

export enum SupportedGitPlatforms {
	GITHUB = 'github',
	GITLAB = 'gitlab',
	BITBUCKET = 'bitbucket',
}

export const GitPlatformsOptions: ComboboxData = [
	{
		disabled: false,
		value: SupportedGitPlatforms.GITHUB,
		label: 'GitHub',
	},

	{
		disabled: true,
		value: SupportedGitPlatforms.GITLAB,
		label: 'Gitlab (Coming Soon)',
	},

	{
		disabled: true,
		value: SupportedGitPlatforms.BITBUCKET,
		label: 'Bitbucket (Coming Soon)',
	},
]

export const getUrlForGitPlatform = (platform: SupportedGitPlatforms) => {
	switch (platform) {
		case SupportedGitPlatforms.GITHUB:
			return 'https://github.com'
		case SupportedGitPlatforms.GITLAB:
			return 'https://gitlab.com'
		case SupportedGitPlatforms.BITBUCKET:
			return 'https://bitbucket.org'
		default:
			return ''
	}
}
