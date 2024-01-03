import ReactFlow, {
	Background,
	BackgroundVariant,
	Controls,
	Panel,
} from 'reactflow'
import { AddNodeModal } from 'src/components/modals/AddNodeModal'
import MicroserviceNode from './nodes/Microservice.node'
import { useFlowStore } from './store/flowstore'
import { NodeTypes } from './store/types.store'

const nodeTypes = {
	[NodeTypes.MICROSERVICE]: MicroserviceNode,
}
export default function Flow() {
	const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
		useFlowStore()
	return (
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
				</Panel>
				<Controls />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</div>
	)
}
