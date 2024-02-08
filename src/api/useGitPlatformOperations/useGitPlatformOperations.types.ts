import { useMutation, useQueryClient } from '@tanstack/react-query'
import useUserStore from 'src/store/userStore'
import axios from '../axios'
import { GitPlatformDTO } from './useGitPlatformOperations'

export function useGitPlatformOperations() {
	const {
		personalDetails: { email },
	} = useUserStore()
	const postGitPlatform = useMutation({
		mutationFn: async (gitPlatform: GitPlatformDTO) => {
			const { data } = await axios.post(
				`/users/${email}/gitPlatforms`,
				gitPlatform
			)
			return data as GitPlatformDTO
		},
	})
}
