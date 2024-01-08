import { Box, Button, Group, TextInput, Textarea } from '@mantine/core'
import { modals } from '@mantine/modals'
import { getInitialMicroserviceNodeFormData } from 'src/canvas/nodes/microservice/Microservice.utils'
import { useFlowStore } from 'src/canvas/store/flowstore'
import { MicroServiceNode, NodeTypes } from 'src/canvas/store/types.store'
import { getRandomNodeId } from 'src/utils/nanoid'

const testing = true

export function AddNodeModal() {
	const addDummyNode = () => {
		const node: MicroServiceNode = {
			data: {
				...getInitialMicroserviceNodeFormData(),
				name: 'Dummy Node Name',
				description: `Insanely large node description
Insanely large node description
written by me`,
				type: NodeTypes.MICROSERVICE,
			},
			type: NodeTypes.MICROSERVICE,
			id: getRandomNodeId(),
			position: {
				x: (Math.random() * window.innerWidth) / 2,
				y: (Math.random() * window.innerHeight) / 2,
			},
		}
		addNode(node)
		modals.closeAll()
	}
	const { addNode } = useFlowStore()
	const handleAddNodeClick = (name: string, description: string) => {
		const node: MicroServiceNode = {
			data: {
				...getInitialMicroserviceNodeFormData(),
				description: description,
				name: name,
				type: NodeTypes.MICROSERVICE,
			},
			type: NodeTypes.MICROSERVICE,
			id: Date.now().toString(),
			position: {
				x: (Math.random() * window.innerWidth) / 2,
				y: (Math.random() * window.innerHeight) / 2,
			},
		}
		addNode(node)
	}
	const openAddNodeModal = () =>
		modals.open({
			title: 'Add Node',
			children: (
				<Box>
					{testing ? (
						<Button onClick={addDummyNode}>Add Dummy Node</Button>
					) : (
						<form
							onSubmit={(e) => {
								e.preventDefault()
								e.stopPropagation()
								const target = e.target as unknown as { value: string }[]
								handleAddNodeClick(target[0].value, target[1].value)
								modals.closeAll()
							}}
						>
							<TextInput
								withAsterisk
								required
								label='Node Name'
								placeholder='Enter Node Name'
								data-autofocus
							/>
							<Textarea
								rows={4}
								mt='md'
								withAsterisk
								required
								label='Node Description'
								placeholder='Enter Node Description'
							/>
							<Group mt='md'>
								<Button type='submit'>Submit</Button>
							</Group>
						</form>
					)}
				</Box>
			),
			onClose: () => {
				console.log('Close')
			},
		})
	return <Button onClick={openAddNodeModal}>Add Microservice Node</Button>
}
