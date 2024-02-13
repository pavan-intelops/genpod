import useUserStore from 'src/store/userStore'
import axios from '../axios'
import { Project } from 'src/components/user/projects/types'

export const useProjectOperations = () => {
	const {
		personalDetails: { email },
	} = useUserStore()

	const postProject = async (project: Project) => {
		if (!email) {
			return { error: new Error('User email is required') }
		}
		try {
			const { data } = await axios.post(`/users/${email}/projects`, project)
			return { data }
		} catch (error) {
			return { error }
		}
	}

	const getProjects = async () => {
		if (!email) {
			return { error: new Error('User email is required') }
		}
		try {
			const { data } = await axios.get(`/users/${email}/projects`)
			return { data }
		} catch (error) {
			return { error }
		}
	}

	const updateProject = async (projectId: string, projectDetails: Project) => {
		if (!email) {
			return { error: new Error('User email is required') }
		}
		try {
			await axios.put(`/users/${email}/projects/${projectId}`, projectDetails)
			return { data: projectDetails } // Assuming the backend doesn't return the updated project
		} catch (error) {
			return { error }
		}
	}

	const deleteProject = async (projectId: string) => {
		if (!email) {
			return { error: new Error('User email is required') }
		}
		try {
			await axios.delete(`/users/${email}/projects/${projectId}`)
			return { data: null } // Indicate successful deletion
		} catch (error) {
			return { error }
		}
	}

	return {
		postProject,
		getProjects,
		updateProject,
		deleteProject,
	}
}
