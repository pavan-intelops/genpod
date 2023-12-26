import { Grid, Stack } from '@mantine/core'
import { useCallback } from 'react'

import ReactFlow, {
	Background,
	Controls,
	MiniMap,
	addEdge,
	useEdgesState,
	useNodesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { HeaderDefault } from 'src/components/headers/header-default/HeaderDefault'
import SideNavbar from 'src/components/side-nav/SideNavbar'
const initialNodes = [
	{ id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
	{ id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
]
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }]

export default function Layout() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

	const onConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[setEdges]
	)
	return (
		<Stack>
			<HeaderDefault />
			<Grid
				style={{
					width: '100vw',
				}}
			>
				<Grid.Col span={2}>
					<SideNavbar />
				</Grid.Col>
				<Grid.Col span={10}>
					<div style={{ width: '100%', height: '100%' }}>
						<ReactFlow
							nodes={nodes}
							edges={edges}
							onNodesChange={onNodesChange}
							onEdgesChange={onEdgesChange}
							onConnect={onConnect}
						>
							<Controls />
							<MiniMap />
							<Background variant='dots' gap={12} size={1} />
						</ReactFlow>
					</div>
				</Grid.Col>
			</Grid>
		</Stack>
	)
}
