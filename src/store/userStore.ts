import { StoreApi, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { UserStore } from './types'

const gitPlatformStore = (
	set: StoreApi<UserStore>['setState'],
	get: StoreApi<UserStore>['getState']
): Pick<UserStore, 'gitPlatformStore'> => {
	return {
		gitPlatformStore: {
			gitPlatforms: [],
			setGitPlatforms: (gitPlatforms, append = true) => {
				const { gitPlatforms: currentGitPlatforms } = get().gitPlatformStore
				if (Array.isArray(gitPlatforms)) {
					if (append) {
						set({
							gitPlatformStore: {
								...get().gitPlatformStore,
								gitPlatforms: [...currentGitPlatforms, ...gitPlatforms],
							},
						})
					} else {
						set({
							gitPlatformStore: {
								...get().gitPlatformStore,
								gitPlatforms,
							},
						})
					}
				} else {
					if (append) {
						set({
							gitPlatformStore: {
								...get().gitPlatformStore,
								gitPlatforms: [...currentGitPlatforms, gitPlatforms],
							},
						})
					} else {
						set({
							gitPlatformStore: {
								...get().gitPlatformStore,
								gitPlatforms: [gitPlatforms],
							},
						})
					}
				}
			},
			removeGitPlatform: (gitPlatform) => {
				set({
					gitPlatformStore: {
						...get().gitPlatformStore,
						gitPlatforms: get().gitPlatformStore.gitPlatforms.filter(
							(gp) => gp.username !== gitPlatform.username
						),
					},
				})
			},
		},
	}
}

const useUserStore = create<UserStore>()(
	devtools(
		persist(
			(set, get) => ({
				personalDetails: {
					email: '',
				},
				isUserLoggedIn: () => {
					return !!get().personalDetails.email
				},
				logout: () => {
					localStorage.removeItem('user-store')
					set(
						{
							personalDetails: {
								email: '',
							},
						},
						false
					)
				},
				setPersonalDetails: (personalDetails) => {
					set(
						{
							personalDetails,
						},
						false
					)
				},
				...gitPlatformStore(set, get),
			}),
			{
				name: 'user-store',
			}
		)
	)
)

export default useUserStore
