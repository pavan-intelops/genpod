import { Project } from 'src/components/user/projects/types'
import useUserStore from 'src/store/userStore'
import axios from '../axios'
import { UseOperationsReturnType } from '../api.types'

export const useProjectOperations = () => {
	const {
		personalDetails: { email },
	} = useUserStore()

	const postProject = async (
		project: Project
	): UseOperationsReturnType<Project> => {
		if (!email) {
			return { error: new Error('User email is required') }
		}
		try {
			const stringifiedProject = JSON.stringify(project)
			const { data } = await axios.post(
				`/users/${email}/projects`,
				stringifiedProject
			)
			return { data }
		} catch (error) {
			return { error }
		}
	}

	const getProjects = async (): UseOperationsReturnType<Project[]> => {
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

	const getProject = async (
		projectId: string
	): UseOperationsReturnType<Project> => {
		if (!email) {
			return { error: new Error('User email is required') }
		}
		try {
			const { data } = await axios.get(`/users/${email}/projects/${projectId}`)
			return { data: JSON.parse(data) }
		} catch (error) {
			return { error }
		}
	}

	const updateProject = async (
		projectId: string,
		projectDetails: Project
	): UseOperationsReturnType<Project> => {
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

	const deleteProject = async (projectId: string): UseOperationsReturnType => {
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
		getProject,
		updateProject,
		deleteProject,
	}
}
