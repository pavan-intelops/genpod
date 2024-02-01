import { Box, Flex, Text } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { Select, TextInput } from 'react-hook-form-mantine'
import { SupportedGitPlatforms } from 'src/components/user/git-platforms/types'
import { AddNewForm } from './AddOrLoadProject'
import classes from './AddOrLoadProject.module.css'

export default function AddOrLoadProject() {
	const addNewForm = useForm<AddNewForm>({
		defaultValues: {
			gitPlatform: SupportedGitPlatforms.GITHUB,
			isRepositoryPublic: true,
			name: '',
			repositoryBranch: '',
			repositoryName: '',
		},
		mode: 'all',
	})

	return (
		<Box className={classes.container}>
			<Text size='xl' fw='bolder'>
				Add Or Load Project
			</Text>
			<Flex className={classes.formContainer}>
				<Box w='50%' p='md' bg='dark' className={classes.form}>
					<form
						onSubmit={addNewForm.handleSubmit((data) => {
							console.log('====================================')
							console.log(data)
							console.log('====================================')
						}, console.error)}
					>
						<Flex rowGap='md' direction='column'>
							<Text size='md'>Add New Project</Text>
							<TextInput
								withAsterisk
								control={addNewForm.control}
								name='name'
								placeholder='Project Name'
								label='Project Name'
							/>

							<Select
								selectFirstOptionOnChange={false}
								control={addNewForm.control}
								name='gitPlatform'
								data={[]}
							/>
						</Flex>
					</form>
				</Box>
				<Box w='50%' p='md' bg='dark' className={classes.form}>
					<Text size='sm'>Load Project</Text>
				</Box>
			</Flex>
		</Box>
	)
}
