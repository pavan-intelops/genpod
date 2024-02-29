import { GitPlatform, UserStore } from 'src/store/types'
import useUserStore from 'src/store/userStore'
import axios from '../axios'
import { GitPlatformDTO } from './useGitPlatformOperations.types'

const transformToGitPlatformDTO =
	(store: UserStore) =>
	(data: GitPlatform): GitPlatformDTO => {
		return {
			name: data.gitPlatform,
			ownerEmail: store.personalDetails.email,
			personalAccessToken: data.personalAccessToken,
			url: data.url,
			userName: data.username,
		}
	}
const transformTGitPlatform = (data: GitPlatformDTO): GitPlatform => {
	return {
		gitPlatform: data.name,
		personalAccessToken: data.personalAccessToken,
		url: data.url,
		username: data.userName,
	}
}
export function useGitPlatformOperations() {
	const {
		personalDetails: { email },
	} = useUserStore()

	const postGitPlatform = async (gitPlatform: GitPlatform) => {
		if (!email) {
			return { error: new Error('User email is required') }
		}
		try {
			const transformedData = JSON.stringify(
				transformToGitPlatformDTO(useUserStore.getState())(gitPlatform)
			)
			const { data } = await axios.post(
				`/users/${email}/gitPlatforms`,
				transformedData
			)
			return { data: transformTGitPlatform(JSON.parse(data)) }
		} catch (error) {
			return { error }
		}
	}

	const getGitPlatforms = async () => {
		if (!email) {
			return { error: new Error('User email is required') }
		}
		try {
			const res = await axios.get(`/users/${email}/gitPlatforms`)
			return {
				data: JSON.parse(res.data).map(transformTGitPlatform) as GitPlatform[],
			}
		} catch (error) {
			return { error }
		}
	}

	const updateGitPlatform = async (gitPlatform: GitPlatform) => {
		if (!email) {
			return { error: new Error('User email is required') }
		}
		try {
			const transformedData = JSON.stringify(
				transformToGitPlatformDTO(useUserStore.getState())(gitPlatform)
			)
			await axios.put(
				`/users/${email}/gitPlatforms/${gitPlatform.gitPlatform}`,
				transformedData
			)
			return { data: gitPlatform } // Assuming the update doesn't return the updated object.
		} catch (error) {
			return { error }
		}
	}

	const deleteGitPlatform = async (name: string) => {
		if (!email) {
			return { error: new Error('User email is required') }
		}
		try {
			await axios.delete(`/users/${email}/gitPlatforms/${name}`)
			return { data: null } // Indicate successful deletion without specific data.
		} catch (error) {
			return { error }
		}
	}

	return {
		postGitPlatform,
		getGitPlatforms,
		updateGitPlatform,
		deleteGitPlatform,
	}
}
