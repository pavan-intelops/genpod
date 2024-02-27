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
import { modals } from '@mantine/modals'
import { IconTrash } from '@tabler/icons-react'
import { useCallback, useEffect } from 'react'
import { useGitPlatformOperations } from 'src/api/useGitPlatformOperations'
import { useSyncActions } from 'src/hooks/useSyncActions'
import { GitPlatform } from 'src/store/types'
import useUserStore from 'src/store/userStore'
import AddGitPlatformModalContent from './AddGitPlatformModalContent'

export default function GitPlatforms() {
	const [opened, { open, close }] = useDisclosure(false)
	const {
		gitPlatformStore: { gitPlatforms, setGitPlatforms },
	} = useUserStore()

	const { postGitPlatform, deleteGitPlatform } = useGitPlatformOperations()

	const { syncGitPlatforms } = useSyncActions()

	useEffect(() => {
		;(async function () {
			await syncGitPlatforms()
		})()
	}, [syncGitPlatforms])

	const handleOnButtonClick = useCallback(() => {
		return open()
	}, [open])
	const openDeleteModal = (platform: GitPlatform) => {
		modals.openConfirmModal({
			title: `Delete your ${platform.gitPlatform} platform?`,
			centered: true,
			children: (
				<Text size='sm'>
					Are you sure you want to remove the {platform.gitPlatform} of user{' '}
					<Text size='sm' fw='bolder' display='inline-block'>
						{platform.username}
					</Text>
				</Text>
			),
			labels: { confirm: 'Delete It', cancel: "No don't delete it" },
			confirmProps: { color: 'red.5' },
			onConfirm: async () => {
				await deleteGitPlatform(platform.gitPlatform)
				await syncGitPlatforms()
			},
		})
	}
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
								<Table.Td>****************************************</Table.Td>
								<Table.Td>
									<ActionIcon
										p={2}
										bg='red.7'
										onClick={() => openDeleteModal(gitPlatform)}
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
					onSubmit={async (data) => {
						const res = await postGitPlatform(data)
						if (res.data) {
							setGitPlatforms(res.data)
							close()
						}
					}}
				/>
			</Modal>
		</>
	)
}
