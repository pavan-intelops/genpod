import { create } from 'zustand'
import { UserStore } from './types'

const useUserStore = create<UserStore>((set, get) => ({
	gitPlatforms: [],
	setGitPlatforms: (gitPlatforms, append = true) => {
		if (Array.isArray(gitPlatforms)) {
			if (append) {
				set({ gitPlatforms: [...get().gitPlatforms, ...gitPlatforms] })
			} else {
				set({ gitPlatforms })
			}
		} else {
			if (append) {
				set({ gitPlatforms: [...get().gitPlatforms, gitPlatforms] })
			} else {
				set({ gitPlatforms: [gitPlatforms] })
			}
		}
	},
}))

export default useUserStore
