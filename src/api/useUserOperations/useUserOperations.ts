import axios from '../axios'
import { UserDTO } from './useUserOperations.types'

export function useUserOperations() {
	const postUser = async (user: UserDTO): Promise<UserDTO> => {
		const { data } = await axios.post(`/users`, user)
		return data
	}
	const getUser = async (email: string): Promise<UserDTO | null> => {
		if (!email) {
			return Promise.resolve(null) // Or handle this case as needed
		}
		try {
			const { data } = await axios.get(`/users/${email}`)
			return data
		} catch (error) {
			console.log('====================================')
			console.log('Error in getUser', error)
			console.log('====================================')
			// If the user is not found, you might want to automatically post/create the user
			// This behavior was inferred from your original useQuery and useMutation setup
			const newUser = await postUser({ email }) // Assuming email is the only required field for UserDTO
			return newUser
		}
	}

	return { postUser, getUser }
}
