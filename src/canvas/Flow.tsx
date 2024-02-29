import { Box, Button, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import ReactFlow, {
	Background,
	BackgroundVariant,
	Controls,
	Panel,
} from 'reactflow'
import AddNodeModal from 'src/components/common/modal/AddNodeModal'
import CodeViewDrawer from './drawers/code-view/CodeViewDrawer'
import ClientNode from './nodes/client-node/ClientNode.node'
import DBNode from './nodes/db-node/DBNode.node'
import MicroserviceNode from './nodes/microservice/MicroserviceNode.node'
import { useFlowsStore } from './store/flowstore'
import { NodeTypes } from './store/types.store'

const nodeTypes = {
	[NodeTypes.MICROSERVICE]: MicroserviceNode,
	[NodeTypes.DB_NODE]: DBNode,
	[NodeTypes.CLIENT_NODE]: ClientNode,
}

// interface FlowProps extends Partial<ReactFlowProps> {}
export default function Flow() {
	const { onNodesChange, onEdgesChange, onConnect, getNodesAndEdges } =
		useFlowsStore()
	const { nodes, edges } = getNodesAndEdges()
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
						<AddNodeModal
							type={NodeTypes.MICROSERVICE}
							buttonText='Add Microservice Node'
							mx='sm'
						/>
						<AddNodeModal
							type={NodeTypes.DB_NODE}
							buttonText='Add DB Node'
							mx='sm'
						/>
						<AddNodeModal
							type={NodeTypes.CLIENT_NODE}
							buttonText='Add Client Node'
							mx='sm'
						/>
						<Button bg='blue.4' ml='sm' onClick={() => openCodeViewDrawer()}>
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
