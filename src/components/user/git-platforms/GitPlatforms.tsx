import {
	ActionIcon,
	Box,
	Button,
	Divider,
	Modal,
	Space,
	Table,
	Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconTrash } from '@tabler/icons-react'
import { useCallback } from 'react'
import useUserStore from 'src/store/userStore'
import AddGitPlatformModalContent from './AddGitPlatformModalContent'
import { modals } from '@mantine/modals'

export default function GitPlatforms() {
	const [opened, { open, close }] = useDisclosure(false)
	const { gitPlatforms, setGitPlatforms } = useUserStore()
	const handleOnButtonClick = useCallback(() => {
		return open()
	}, [open])
	const openDeleteModal = (platform: string) =>
		modals.openConfirmModal({
			title: `Delete your ${platform}`,
			centered: true,
			children: (
				<Text size='sm'>Are you sure you want to remove the platform?</Text>
			),
			labels: { confirm: 'Delete It', cancel: "No don't delete it" },
			confirmProps: { color: 'red.5' },
			onConfirm: () => {
				// TODO: Proceed to delete the platform
				return console.log('Confirmed')
			},
		})
	return (
		<>
			<Box p='sm'>
				<Table>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Git Platform</Table.Th>
							<Table.Th>URL</Table.Th>
							<Table.Th>Username</Table.Th>
							<Table.Th>Personal Access Token</Table.Th>
							<Table.Th>Actions</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{gitPlatforms.map((gitPlatform, i) => (
							<Table.Tr key={i}>
								<Table.Td>{gitPlatform.gitPlatform}</Table.Td>
								<Table.Td>{gitPlatform.url}</Table.Td>
								<Table.Td>{gitPlatform.username}</Table.Td>
								<Table.Td>{gitPlatform.personalAccessToken}</Table.Td>
								<Table.Td>
									<ActionIcon
										p={2}
										bg='red.7'
										onClick={() => openDeleteModal(gitPlatform.gitPlatform)}
									>
										<IconTrash />
									</ActionIcon>
								</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
				<Space h='lg' />
				<Divider variant='dashed' />
				<Space h='lg' />
				<Button type='button' variant='outline' onClick={handleOnButtonClick}>
					Add New Git Platform
				</Button>
			</Box>
			<Modal
				opened={opened}
				onClose={close}
				title='Add New Git Platform'
				centered
			>
				<AddGitPlatformModalContent
					onClose={close}
					onSubmit={(data) => {
						console.log('====================================')
						console.log(data)
						console.log('====================================')
						setGitPlatforms(data)
						close()
					}}
				/>
			</Modal>
		</>
	)
}
