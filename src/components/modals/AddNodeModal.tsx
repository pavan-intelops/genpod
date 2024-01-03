import { Box, Button, Group, TextInput } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useFlowStore } from 'src/canvas/store/flowstore'
import { MicroServiceNode, NodeTypes } from 'src/canvas/store/types.store'

export function AddNodeModal() {
	const { addNode } = useFlowStore()
	const handleAddNodeClick = (name: string, description: string) => {
		const node: MicroServiceNode = {
			data: {
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
						/>
						<TextInput
							withAsterisk
							required
							label='Node Description'
							placeholder='Enter Node Description'
						/>
						<Group mt='md'>
							<Button type='submit'>Submit</Button>
						</Group>
					</form>
				</Box>
			),
			onClose: () => {
				console.log('Close')
			},
		})
	return <Button onClick={openAddNodeModal}>Add Microservice Node</Button>
}
