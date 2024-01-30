import { Button, Container, Flex, Text } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { TextInput } from 'react-hook-form-mantine'

export default function Login() {
	const form = useForm({
		defaultValues: {
			email: '',
		},
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
				<TextInput
					type='email'
					placeholder='Email'
					control={form.control}
					name='email'
					withAsterisk
					label='Email'
				/>
				<Button
					color='orange'
					onClick={() => {
						console.log(form.getValues())
					}}
				>
					Login
				</Button>
			</Flex>
		</Container>
	)
}
