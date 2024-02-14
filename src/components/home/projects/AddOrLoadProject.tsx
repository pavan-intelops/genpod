import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Flex, Text, Tooltip } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { Checkbox, Select, TextInput } from 'react-hook-form-mantine'
import { useNavigate } from 'react-router-dom'
import { useProjectOperations } from 'src/api/useProjectOperations/useProjectOperations'
import useUserStore from 'src/store/userStore'
import { convertToSelectOptionItems } from 'src/utils/transformers'
import * as z from 'zod'
import classes from './AddOrLoadProject.module.css'
import { AddNewForm } from './AddOrLoadProject.types'

const resolver = z.object({
	name: z.string().min(1, 'Project Name is required'),
	gitPlatform: z.string().min(1, 'Select a Git Platform'),
	repositoryBranch: z.string().min(1, 'Repository Branch is required'),
	repositoryName: z.string().min(1, 'Repository Name is required'),
	isRepositoryPublic: z.boolean(),
})

export default function AddOrLoadProject() {
	const {
		gitPlatformStore,
		personalDetails: { email },
	} = useUserStore()
	const { postProject } = useProjectOperations()
	const navigate = useNavigate()
	const areGitPlatformsThere = gitPlatformStore.gitPlatforms.length > 0
	const handleOnAddGitPlatformClick = () => {
		navigate('/profile?activeTab=gitPlatforms')
	}
	const addNewForm = useForm<AddNewForm>({
		defaultValues: {
			gitPlatform: '',
			isRepositoryPublic: true,
			name: '',
			repositoryBranch: '',
			repositoryName: '',
		},
		resolver: zodResolver(resolver),
		mode: 'onChange',
	})
	const handleOnSubmit = addNewForm.handleSubmit(async (data) => {
		const project = {
			displayName: data.name,
			gitPlatformName: data.gitPlatform,
			isRepositoryPublic: data.isRepositoryPublic,
			version: 'v1',
			repositoryBranch: data.repositoryBranch,
			gitPlatformUserName: gitPlatformStore.gitPlatforms.find(
				(platform) => platform.gitPlatform === data.gitPlatform
			)?.username as string,
			ownerEmail: email,
		}
		const { data: res, error } = await postProject(project)
		if (error) {
			console.error(error)
			return
		}
		console.log('====================================')
		console.log(res)
		console.log('====================================')
	})
	return (
		<Box className={classes.container}>
			<Text size='xl' fw='bolder'>
				Add Or Load Project
			</Text>
			<Flex className={classes.formContainer}>
				<Box w='50%' p='md' bg='dark' className={classes.form}>
					<form onSubmit={handleOnSubmit}>
						<Flex rowGap='md' direction='column'>
							<Text size='md'>Add New Project</Text>
							<TextInput
								withAsterisk
								control={addNewForm.control}
								name='name'
								placeholder='Project Name'
								label='Project Name'
							/>
							{areGitPlatformsThere ? (
								<Select
									placeholder='Select Git Platform'
									selectFirstOptionOnChange={false}
									control={addNewForm.control}
									name='gitPlatform'
									label='Git Platform'
									data={convertToSelectOptionItems(
										gitPlatformStore.gitPlatforms,
										'gitPlatform',
										'gitPlatform'
									)}
								/>
							) : (
								<Flex columnGap='xs'>
									<Tooltip label='Please add Git Platform first'>
										{/* Had to add Box component around select component because pointer events will not work on disabled select component */}
										<Box>
											<Select
												flex={1}
												selectFirstOptionOnChange={false}
												disabled
												placeholder='Select Git Platform'
												control={addNewForm.control}
												name='gitPlatform'
											/>
										</Box>
									</Tooltip>
									<Button
										variant='transparent'
										c='orange.6'
										onClick={handleOnAddGitPlatformClick}
									>
										Add Git Platforms
									</Button>
								</Flex>
							)}
							<TextInput
								control={addNewForm.control}
								name='repositoryName'
								placeholder='Repository Name'
								label='Repository Name'
							/>
							<TextInput
								control={addNewForm.control}
								name='repositoryBranch'
								placeholder='Repository Branch'
								label='Repository Branch'
							/>
							<Checkbox
								control={addNewForm.control}
								name='isRepositoryPublic'
								label='Is Repository Public'
							/>
							<Button type='submit'>Add Project</Button>
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
