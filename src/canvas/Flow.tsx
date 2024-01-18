import ReactFlow, {
	Background,
	BackgroundVariant,
	Controls,
	Panel,
} from 'reactflow'
import { AddNodeModal } from 'src/components/common/modals/AddNodeModal'
import MicroserviceNode from './nodes/microservice/MicroserviceNode.node'
import { useFlowStore } from './store/flowstore'
import { NodeTypes } from './store/types.store'
import { Box, Button, Drawer } from '@mantine/core'
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
			<Box w='100%' h='100%'>
				<ReactFlow
					proOptions={{
						hideAttribution: true,
					}}
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
			</Box>
			<Drawer
				size='xl'
				position='right'
				onClose={closeCodeViewDrawer}
				opened={isCodeViewDrawerOpen}
				closeOnEscape={false}
			>
				<CodeViewDrawer />
			</Drawer>
		</>
	)
}
