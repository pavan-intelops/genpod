import {
	ActionIcon,
	Center,
	ScrollArea,
	SimpleGrid,
	Table,
	Text,
	Tooltip,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconRefresh, IconTrash } from '@tabler/icons-react'
import { memo, useEffect } from 'react'
import { useProjectOperations } from 'src/api/useProjectOperations/useProjectOperations'
import { useProjectStore } from 'src/store/useProjectStore'
import { Project } from './types'

interface TabularProjectData {
	id: string
	name: string
	repositoryUrl: string
	isRepositoryPublic: boolean
	version: string
}

const openDeleteProjectConfirmModal = (projectId: string) =>
	modals.openConfirmModal({
		title: 'Delete your profile',
		centered: true,
		children: (
			<Text size='sm'>
				Are you sure you want to delete this project (id: {projectId})? This is
				permanent and cannot be undone.
			</Text>
		),
		labels: { confirm: 'Delete Project', cancel: "No don't delete it" },
		confirmProps: { color: 'red' },
		onCancel: () => console.log('Cancel'),
		onConfirm: () => console.log('Confirmed'),
	})

const convertProjectDataToTabularData = (projects: Project[]) => {
	return projects.map((project) => {
		const { id, displayName, gitPlatformName, isRepositoryPublic, version } =
			project
		return {
			id,
			name: displayName,
			repositoryUrl: gitPlatformName,
			isRepositoryPublic,
			version,
		}
	})
}
export default function Projects() {
	const { getProjects } = useProjectOperations()
	const { setProjects, projects } = useProjectStore()
	useEffect(() => {
		;(async function () {
			const data = await getProjects()
			if (!data) {
				setProjects([])
			}
			console.log('data: ', data)
		})()
	}, [])
	const rows = convertProjectDataToTabularData(projects).map(
		(project, index) => <TableRow {...project} key={project.id || index} />
	)
	return (
		<ScrollArea h='100%'>
			<Table
				highlightOnHover
				withTableBorder
				withColumnBorders
				horizontalSpacing={20}
			>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>ID</Table.Th>
						<Table.Th>Project Name</Table.Th>
						<Table.Th>Repository URL</Table.Th>
						<Table.Th>Repository Visibility</Table.Th>
						<Table.Th>Version</Table.Th>
						<Table.Th>Actions</Table.Th>
					</Table.Tr>
				</Table.Thead>
				{rows.length ? (
					<Table.Tbody>{rows}</Table.Tbody>
				) : (
					<Table.Tbody>
						<Table.Tr>
							<Table.Td colSpan={6}>
								<Center w='100%' h='100%'>
									<Text ml='sm'>No Projects</Text>
								</Center>
							</Table.Td>
						</Table.Tr>
					</Table.Tbody>
				)}
			</Table>
		</ScrollArea>
	)
}

const TableRow = memo(
	(project: TabularProjectData) => {
		return (
			<Table.Tr key={project.id}>
				<Table.Td>{project.id}</Table.Td>
				<Table.Td>{project.name}</Table.Td>
				<Table.Td>{project.repositoryUrl}</Table.Td>
				<Table.Td>{project.isRepositoryPublic ? 'Public' : 'Private'}</Table.Td>
				<Table.Td>{project.version}</Table.Td>
				<Table.Td>
					<SimpleGrid cols={2}>
						<Tooltip label='Load'>
							<ActionIcon p={2}>
								<IconRefresh />
							</ActionIcon>
						</Tooltip>
						<Tooltip label='Delete Project'>
							<ActionIcon
								p={2}
								onClick={() => openDeleteProjectConfirmModal(project.id)}
								bg='red.7'
							>
								<IconTrash />
							</ActionIcon>
						</Tooltip>
					</SimpleGrid>
				</Table.Td>
			</Table.Tr>
		)
	},
	(prevProps, nextProps) => prevProps.id === nextProps.id
)
