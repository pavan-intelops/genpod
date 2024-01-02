import { Button } from '@mantine/core'
import ReactFlow, {
	Background,
	BackgroundVariant,
	Controls,
	MiniMap,
	Panel,
} from 'reactflow'
import { useFlowStore } from './store/flowstore'
import { MicroServiceNode, NodeTypes } from './store/types.store'

export default function Flow() {
	const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
		useFlowStore()
	const handleAddNodeClick = () => {
		const node: MicroServiceNode = {
			data: {
				description: 'Lol',
				name: 'Lol',
				type: NodeTypes.MICROSERVICE,
			},
			id: Date.now().toString(),
			position: {
				x: Math.random() * window.innerWidth,
				y: (Math.random() * window.innerHeight) / 2,
			},
		}
		addNode(node)
	}
	return (
		<div style={{ width: '100%', height: '100%' }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
			>
				<Panel position='top-left'>
					<Button
						onClick={handleAddNodeClick}
						className=' bg-gray-400 px-3 py-1 rounded-md mx-1 outline'
					>
						Add Node
					</Button>
				</Panel>
				<Controls />
				<MiniMap />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</div>
	)
}
