import {
	ActionIcon,
	ActionIconGroup,
	Button,
	Flex,
	Grid,
	Group,
	Modal,
	Table,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconEdit, IconTrashFilled } from '@tabler/icons-react'
import { useState } from 'react'
import { UseFormReturn, useFieldArray } from 'react-hook-form'
import { NumberInput, Select } from 'react-hook-form-mantine'
import { getDBOptions } from '../Microservice.utils'
import { MicroServiceNodeFormDataUI, Resource } from '../MicroserviceNode.types'
import classes from '../styles.module.css'
import AddResourceModalContent from './AddResourceModalContent'
import UpdateResourceModalContent from './UpdateResourceModalContent'

interface GRPCConfigFormProps {
	form: UseFormReturn<MicroServiceNodeFormDataUI>
}
export default function GRPCConfigForm({ form }: GRPCConfigFormProps) {
	const [
		isAddResourceModalOpen,
		{ close: closeAddResourceModal, open: openAddResourceModal },
	] = useDisclosure(false)

	const [
		isEditResourceModalOpen,
		{ close: closeEditResourceModal, open: openEditResourceModal },
	] = useDisclosure(false)

	const [editResourceIndex, setEditResourceIndex] = useState<
		number | undefined
	>(undefined)

	const {
		append: appendResource,
		update: updateResource,
		remove: removeResource,
	} = useFieldArray({
		control: form.control,
		name: 'grpcConfig.server.resources',
	})
	return (
		<>
			<Flex direction='column' className={classes.group} mt='md' gap='md'>
				<Button size='md' fw='bold' variant='transparent'>
					GRPC Config
				</Button>
				<Grid grow>
					<Grid.Col span={6}>
						<NumberInput
							withAsterisk
							control={form.control}
							valueIsNumericString
							name='grpcConfig.server.port'
							label='Port'
							placeholder='Port'
						/>
					</Grid.Col>
					<Grid.Col span={12}>
						<Group>
							<Select
								withAsterisk
								control={form.control}
								name='grpcConfig.server.sqlDB'
								label='SQL Database'
								placeholder='SQL Database'
								data={getDBOptions('sql')}
							/>
							<Select
								withAsterisk
								control={form.control}
								name='grpcConfig.server.noSQLDB'
								label='No SQL Database'
								placeholder='No SQL Database'
								data={getDBOptions('noSql')}
							/>
						</Group>
					</Grid.Col>
					<Grid.Col span={6}>
						<Button
							onClick={() => {
								openAddResourceModal()
							}}
							variant='outline'
						>
							Add Resources
						</Button>
					</Grid.Col>
				</Grid>
				{Boolean(form.watch('grpcConfig.server.resources')) &&
					form.watch('grpcConfig.server.resources')!.length > 0 && (
						<Table>
							<Table.Caption>Existing Resources</Table.Caption>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>Resource</Table.Th>
									<Table.Th>Methods</Table.Th>
									<Table.Th>Actions</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{form
									.watch('grpcConfig.server.resources')
									?.map((resource, index) => (
										<Table.Tr key={index}>
											<Table.Td>{resource.name}</Table.Td>
											<Table.Td>{resource.allowedMethods.join(', ')}</Table.Td>
											<Table.Td>
												<ActionIconGroup>
													<ActionIcon
														variant='transparent'
														c='white'
														onClick={() => {
															setEditResourceIndex(index)
															openEditResourceModal()
														}}
													>
														<IconEdit />
													</ActionIcon>
													<ActionIcon
														variant='transparent'
														c='red'
														ml='xs'
														onClick={() => {
															removeResource(index)
														}}
													>
														<IconTrashFilled />
													</ActionIcon>
												</ActionIconGroup>
											</Table.Td>
										</Table.Tr>
									))}
							</Table.Tbody>
						</Table>
					)}
			</Flex>

			<Modal
				opened={isAddResourceModalOpen}
				onClose={closeAddResourceModal}
				title='Add Resources'
				size='lg'
				closeOnEscape={false}
			>
				<AddResourceModalContent
					onResourceAdd={(resource) => {
						appendResource(resource)
						closeAddResourceModal()
					}}
				/>
			</Modal>
			<Modal
				closeOnEscape={false}
				opened={isEditResourceModalOpen}
				onClose={closeEditResourceModal}
				title='Edit Resource'
				size='lg'
			>
				<UpdateResourceModalContent
					onResourceUpdate={(resource, index) => {
						updateResource(index, resource)
						closeEditResourceModal()
					}}
					resourceIndex={editResourceIndex}
					initialData={
						form.getValues('grpcConfig.server.resources')?.[
							editResourceIndex!
						] as Resource
					}
				/>
			</Modal>
		</>
	)
}
