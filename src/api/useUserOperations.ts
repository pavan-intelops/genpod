import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { GLOBAL_CONSTANTS } from 'src/constants.global'
import { UserDTO } from './types.api'

export function useUserOperations() {
	const postUser = useMutation({
		mutationFn: async (user: UserDTO) => {
			const { data } = await axios.post(
				`${GLOBAL_CONSTANTS.baseBackendUrl}/users`,
				user
			)
			return data
		},
	})
	return { postUser }
}
