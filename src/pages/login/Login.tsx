import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Container, Flex, Space, Text } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { TextInput } from 'react-hook-form-mantine'
import { useNavigate } from 'react-router-dom'
import { useUserOperations } from 'src/api/useUserOperations'
import useUserStore from 'src/store/userStore'
import * as z from 'zod'

const resolver = z.object({
	email: z.string().email(),
})

export default function Login() {
	const form = useForm({
		defaultValues: {
			email: '',
		},
		mode: 'all',
		resolver: zodResolver(resolver),
		shouldFocusError: true,
		shouldUseNativeValidation: false,
	})
	const { setPersonalDetails } = useUserStore()
	const navigate = useNavigate()
	const { postUser } = useUserOperations()
	const handleSubmit = form.handleSubmit(async (data) => {
		setPersonalDetails({
			email: data.email,
		})
		const res = postUser.mutate({
			email: data.email,
		})
		console.log('data: ', res)
		postUser.isSuccess && navigate('/')
	})
	return (
		<Container
			mt='auto'
			size='xs'
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<Flex
				bg='gray.7'
				w='100%'
				direction='column'
				align='flex-start'
				justify='flex-start'
				p='xl'
				rowGap='sm'
			>
				<Text size='xl' fw='bold' td='underline' ta='left'>
					Add your email to create projects
				</Text>
				<form
					onSubmit={handleSubmit}
					onSubmitCapture={(e) => {
						e.preventDefault()
					}}
				>
					<TextInput
						type='email'
						placeholder='Email'
						control={form.control}
						name='email'
						withAsterisk
						label='Email'
					/>
					<Space h='sm' />
					<Button type='submit' color='orange'>
						Login
					</Button>
				</form>
			</Flex>
		</Container>
	)
}
