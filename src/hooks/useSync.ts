import { useCallback } from 'react'
import { useGitPlatformOperations } from 'src/api/useGitPlatformOperations'
import { useProjectOperations } from 'src/api/useProjectOperations/useProjectOperations'
import { useProjectStore } from 'src/store/useProjectStore'
import useUserStore from 'src/store/userStore'

export const useSyncActions = () => {
	const {
		gitPlatformStore: { setGitPlatforms },
	} = useUserStore()
	const { getGitPlatforms } = useGitPlatformOperations()
	const { getProjects } = useProjectOperations()
	const { setProjects } = useProjectStore()

	const syncProjects = useCallback(async () => {
		const { data: projects, error: getProjectsError } = await getProjects()
		if (getProjectsError) {
			return
		}
		setProjects(JSON.parse(projects))
	}, [])

	const syncGitPlatforms = useCallback(async () => {
		const res = await getGitPlatforms()
		res.data && setGitPlatforms(res.data, false)
	}, [])

	return {
		syncGitPlatforms,
		syncProjects,
	}
}
