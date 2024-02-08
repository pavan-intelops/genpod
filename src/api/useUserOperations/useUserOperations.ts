import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useUserStore from 'src/store/userStore'
import { UserDTO } from './useUserOperations.types'
import axios from '../axios'

export function useUserOperations() {
	const queryClient = useQueryClient()
	const {
		personalDetails: { email },
	} = useUserStore()

	const postUser = useMutation({
		mutationFn: async (user: UserDTO) => {
			const { data } = await axios.post(`/users`, user)
			return data as UserDTO
		},
		onSuccess: (data) => {
			queryClient.refetchQueries({
				exact: true,
				queryKey: ['get-user', data.email],
			})
		},
	})
	const getUser = useQuery({
		queryFn: async ({ queryKey }) => {
			const email = queryKey[1]
			if (!email) {
				return null
			}
			try {
				const { data } = await axios.get(`/users/${email}`)
				return data as UserDTO
			} catch (error) {
				postUser.mutate({
					email: email,
				})
				return postUser.data as UserDTO
			}
		},
		queryKey: ['get-user', email],
		retry: 0,
		throwOnError: false,
		notifyOnChangeProps: 'all',
	})

	return { postUser, getUser }
}
