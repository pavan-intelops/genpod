import { Box, Button, Flex, Space } from '@mantine/core'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { PasswordInput, Select, TextInput } from 'react-hook-form-mantine'
import {
	GitPlatformsOptions,
	SupportedGitPlatforms,
	getUrlForGitPlatform,
} from './types'

interface AddGitPlatformModalContentProps {
	onClose: () => void
	onSubmit: (data: AddGitPlatformForm) => void
}
type AddGitPlatformForm = {
	gitPlatform: SupportedGitPlatforms
	url: string
	username: string
	personalAccessToken: string
}
export default function AddGitPlatformModalContent({
	onClose,
	onSubmit,
}: AddGitPlatformModalContentProps) {
	const form = useForm<AddGitPlatformForm>({
		defaultValues: {
			gitPlatform: SupportedGitPlatforms.GITHUB,
			url: getUrlForGitPlatform(SupportedGitPlatforms.GITHUB),
			username: '',
			personalAccessToken: '',
		},
		mode: 'all',
	})

	useEffect(() => {
		form.setValue('url', getUrlForGitPlatform(form.watch('gitPlatform')))
	}, [form])

	return (
		<Box>
			<form
				onSubmitCapture={(e) => e.preventDefault()}
				onSubmit={form.handleSubmit((data) => {
					onSubmit(data)
				})}
			>
				<Flex gap={10} direction='column'>
					<Select
						allowDeselect={false}
						withAsterisk
						label='Git Platform'
						name='gitPlatform'
						control={form.control}
						data={GitPlatformsOptions}
					/>
					<TextInput
						withAsterisk
						control={form.control}
						name='url'
						disabled
						label='URL'
					/>
					<TextInput
						withAsterisk
						control={form.control}
						name='username'
						label='Username'
						placeholder='Username'
					/>
					<PasswordInput
						withAsterisk
						control={form.control}
						name='personalAccessToken'
						label='Personal Access Token'
						placeholder='Personal Access Token'
					/>
				</Flex>
				<Space h='lg' />
				<Flex direction='row' flex={1} columnGap='lg'>
					<Button type='submit'>Add</Button>
					<Button
						variant='danger-outline'
						onClick={() => {
							form.reset()
							onClose()
						}}
					>
						Close
					</Button>
				</Flex>
			</form>
		</Box>
	)
}
