import { Button, Flex, Group, Modal, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { useFlowStore } from 'src/canvas/store/flowstore'
import { MicroServiceNodeFormData } from './MicroserviceNode.types'
interface MicroServiceNodeDrawerFormProps {
	nodeId: string
}
export default function MicroServiceNodeDrawerForm(
	props: MicroServiceNodeDrawerFormProps
) {
	const { getNodeFormData } = useFlowStore()

	const currentFormData = getNodeFormData(props.nodeId)
	const form = useForm<MicroServiceNodeFormData>({
		// initialValues: structuredClone(currentFormData),
		initialValues: {
			id: '',
			name: '',
			description: '',
			language: '',
			restConfig: undefined,
			grpcConfig: undefined,
			wsConfig: undefined,
			metadata: {},
			annotations: {},
		},
	})
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<div>
			<Modal opened={opened} onClose={close} title='Authentication'>
				{/* Modal content */}
			</Modal>
			<form onSubmit={form.onSubmit((values) => console.log(values))}>
				<Flex direction='column' gap={10}>
					{/* <TextInput
						label='Name'
						name='name'
						required
						{...form.getInputProps('name')}
					/>
					<Textarea
						label='Description'
						name='description'
						required
						{...form.getInputProps('description')}
					/> */}
					<Button onClick={open}>Open modal</Button>

					<TextInput label='ID' {...form.getInputProps('id')} />
					<TextInput label='Name' {...form.getInputProps('name')} />
					<TextInput
						label='Description'
						{...form.getInputProps('description')}
					/>
					<Select
						label='Language'
						data={['JavaScript', 'TypeScript', 'Python', 'Go', 'Java']}
						{...form.getInputProps('language')}
					/>

					{/* REST Config Section */}
					<Group>
						<TextInput
							label='REST Template'
							{...form.getInputProps('restConfig.template')}
						/>
						<TextInput
							label='REST Framework'
							{...form.getInputProps('restConfig.framework')}
						/>
						<TextInput
							label='REST Server Port'
							{...form.getInputProps('restConfig.server.port')}
						/>
						<TextInput
							label='REST SQL DB'
							{...form.getInputProps('restConfig.server.sqlDB')}
						/>
						<TextInput
							label='REST NoSQL DB'
							{...form.getInputProps('restConfig.server.noSQLDB')}
						/>
					</Group>
					{/* Additional fields for resources and clients in REST Config */}

					<Button type='submit'>Submit</Button>
				</Flex>
			</form>
		</div>
	)
}
