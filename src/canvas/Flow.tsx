import ReactFlow, {
	Background,
	BackgroundVariant,
	Controls,
	Panel,
} from 'reactflow'
import { AddNodeModal } from 'src/components/modals/AddNodeModal'
import MicroserviceNode from './nodes/microservice/MicroserviceNode.node'
import { useFlowStore } from './store/flowstore'
import { NodeTypes } from './store/types.store'
import { Button, Drawer } from '@mantine/core'
import CodeViewDrawer from './drawers/code-view/CodeViewDrawer'
import { useDisclosure } from '@mantine/hooks'

const nodeTypes = {
	[NodeTypes.MICROSERVICE]: MicroserviceNode,
}
export default function Flow() {
	const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
		useFlowStore()
	const [
		isCodeViewDrawerOpen,
		{ close: closeCodeViewDrawer, open: openCodeViewDrawer },
	] = useDisclosure(false)
	return (
		<>
			<div style={{ width: '100%', height: '100%' }}>
				<ReactFlow
					nodeTypes={nodeTypes}
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
				>
					<Panel position='top-left'>
						<AddNodeModal />
						<Button
							bg='blue.4'
							ml='sm'
							onClick={() => {
								openCodeViewDrawer()
							}}
						>
							View Code
						</Button>
					</Panel>
					<Controls />
					<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
				</ReactFlow>
			</div>
			<Drawer
				size='xl'
				position='right'
				onClose={closeCodeViewDrawer}
				opened={isCodeViewDrawerOpen}
			>
				<CodeViewDrawer />
			</Drawer>
		</>
	)
}
