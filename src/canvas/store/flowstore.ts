import {
	Connection,
	Edge,
	EdgeChange,
	MarkerType,
	Node,
	NodeChange,
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
} from 'reactflow'
import theme from 'src/theme'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { CustomNode, CustomNodeFormData, FlowStore } from './types.store'

const getInitialNodes = () => {
	return [] as CustomNode[]
}
const getInitialEdges = () => {
	return [] as Edge[]
}
export const useFlowStore = create<FlowStore>()(
	devtools((set, get) => {
		return {
			flowKey: '',
			nodes: getInitialNodes(),
			edges: getInitialEdges(),
			activeNode: null,
			refreshActiveNode: () => {
				const { activeNode } = get()
				if (!activeNode) return
				set({
					activeNode: get().nodes.find((node) => node.id === activeNode.id),
				})
			},
			addNode: (node) => {
				set((state) => ({ nodes: state.nodes.concat(node) }))
			},
			setNodes: (nodes) => {
				set((state) => {
					return {
						...state,
						nodes,
					}
				})
			},
			setEdges: (edges) => {
				set((state) => {
					return {
						...state,
						edges,
					}
				})
			},
			onEdgesChange: (changes: EdgeChange[]) => {
				set({
					edges: applyEdgeChanges(changes, get().edges),
				})
			},
			onNodesChange: (changes: NodeChange[]) => {
				set({
					nodes: applyNodeChanges(
						changes,
						get().nodes as unknown as Node[]
					) as CustomNode[],
				})
				get().refreshActiveNode()
			},
			onConnect: (connection: Connection) => {
				set({
					edges: addEdge(
						{
							...connection,
							type: 'default',
							markerStart: {
								type: MarkerType.Arrow,
								color: theme.colors?.orange?.[5],
								strokeWidth: 2,
								width: 20,
							},
						},
						get().edges
					),
				})
			},
			toggleNodeEditDrawer: () => {
				set((state) => {
					return {
						...state,
						isNodeEditDrawerOpen: !state.isNodeEditDrawerOpen,
					}
				})
			},
			setNodeFormData: (nodeFormData: CustomNodeFormData, nodeId?: string) => {
				if (nodeId) {
					set({
						nodes: get().nodes.map((node) => {
							if (node.id === nodeId) {
								return {
									...node,
									data: {
										...node.data,
										...nodeFormData,
									},
								}
							}
							return node
						}) as CustomNode[],
					})
				}
				const { activeNode } = get()
				if (!activeNode) return

				const updatedNode = {
					...activeNode,
					data: {
						...activeNode.data,
						...nodeFormData,
					},
				}
				set({
					nodes: get().nodes.map((node) => {
						if (node.id === activeNode.id) {
							return updatedNode
						}
						return node
					}) as CustomNode[],
				})
			},
			getNodeFormData: (nodeId: string) => {
				return get().nodes.find((node) => node.id === nodeId)
			},
			isNodeEditDrawerOpen: false,
			setActiveNode: (nodeId: string) => {
				const { nodes } = get()
				const node = nodes.find((node) => node.id === nodeId)
				if (!node) return
				set({
					activeNode: node,
				})
			},
		}
	})
)
