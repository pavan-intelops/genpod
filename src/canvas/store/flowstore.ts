import { debounce } from 'lodash'
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
import { emitter } from 'src/emitter'
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
function emitNodesChange() {
	emitter.emit('nodesChange')
}
export const useFlowsStore = create<FlowStore>()(
	devtools((set, get) => {
		return {
			flows: {},
			addFlow: (flowKey: string) => {
				const currentFlows = get().flows
				if (currentFlows && currentFlows[flowKey]) return
				// if there is no active flow then set the newly added flow as active
				if (!get().activeFlow) {
					set({
						activeFlow: flowKey,
					})
				}
				set((state) => {
					return {
						...state,
						flows: {
							...state.flows,
							[flowKey]: {
								flowKey,
								nodes: getInitialNodes(),
								edges: getInitialEdges(),
								activeNode: null,
							},
						},
					}
				})
			},
			removeFlow: (flowKey: string) => {
				set((state) => {
					const flows = { ...state.flows }
					delete flows[flowKey]
					return {
						flows,
					}
				})
			},
			updateFlow: (flowKey: string, flow) => {
				set((state) => {
					return {
						...state,
						flows: {
							...state.flows,
							[flowKey]: flow,
						},
					}
				})
			},
			activeFlow: null,
			setActiveFlow: (flowKey: string) => {
				set({
					activeFlow: flowKey,
				})
			},
			refreshActiveNode: () => {
				const flows = get().flows
				if (!flows) return
				const activeFlow = get().activeFlow || ''
				if (!activeFlow) return
				const { activeNode } = flows[activeFlow]
				if (!activeNode) return
				set({
					flows: {
						...flows,
						[activeFlow]: {
							...flows[activeFlow],
							activeNode:
								flows[activeFlow].nodes.find(
									(node) => node.id === activeNode.id
								) || null,
						},
					},
				})
			},
			setActiveNode: (nodeId: string) => {
				const flows = get().flows
				if (!flows) return
				const activeFlow = get().activeFlow || ''
				if (!activeFlow) return
				const { nodes } = flows[activeFlow]
				const node = nodes.find((node) => node.id === nodeId)
				if (!node) return
				set({
					flows: {
						...flows,
						[activeFlow]: {
							...flows[activeFlow],
							activeNode: node,
						},
					},
				})
			},
			getNodesAndEdges: (flowKey?: string) => {
				const flows = get().flows
				if (!flows) return { nodes: [], edges: [] }
				const activeFlow = flowKey || get().activeFlow || ''
				if (!activeFlow) return { nodes: [], edges: [] }
				return {
					nodes: flows[activeFlow].nodes,
					edges: flows[activeFlow].edges,
				}
			},
			addNode: (node: CustomNode) => {
				const flows = get().flows
				if (!flows) return
				const activeFlow = get().activeFlow || ''
				if (!activeFlow) return
				set({
					flows: {
						...flows,
						[activeFlow]: {
							...flows[activeFlow],
							nodes: flows[activeFlow].nodes.concat(node),
						},
					},
				})
				// emitter.emit('nodesChange')
			},
			setNodes: (nodes: CustomNode[]) => {
				const flows = get().flows
				if (!flows) return
				const activeFlow = get().activeFlow || ''
				if (!activeFlow) return
				set({
					flows: {
						...flows,
						[activeFlow]: {
							...flows[activeFlow],
							nodes,
						},
					},
				})
			},
			setEdges: (edges: Edge[]) => {
				const flows = get().flows
				if (!flows) return
				const activeFlow = get().activeFlow || ''
				if (!activeFlow) return
				set({
					flows: {
						...flows,
						[activeFlow]: {
							...flows[activeFlow],
							edges,
						},
					},
				})
			},
			setNodeFormData: (nodeFormData: CustomNodeFormData, nodeId?: string) => {
				const flows = get().flows
				if (!flows) return
				const activeFlow = get().activeFlow || ''
				if (!activeFlow) return
				if (nodeId) {
					set({
						flows: {
							...flows,
							[activeFlow]: {
								...flows[activeFlow],
								nodes: flows[activeFlow].nodes.map((node) => {
									if (node.id === nodeId) {
										return {
											...node,
											consumerData: {
												...node.data,
												...nodeFormData,
											},
										}
									}
									return node
								}),
							},
						},
					})
				}
				const { activeNode } = flows[activeFlow]
				if (!activeNode) return
				const updatedNode = {
					...activeNode,
					data: {
						...activeNode.data,
						...nodeFormData,
					},
				}
				set({
					flows: {
						...flows,
						[activeFlow]: {
							...flows[activeFlow],
							nodes: flows[activeFlow].nodes.map((node) => {
								if (node.id === activeNode.id) {
									return updatedNode
								}
								return node
							}),
						},
					},
				})
			},
			getNodeFormData: (nodeId: string) => {
				const flows = get().flows
				if (!flows) return
				const activeFlow = get().activeFlow || ''
				if (!activeFlow) return
				return flows[activeFlow].nodes.find((node) => node.id === nodeId)?.data
			},
			onNodesChange: (changes: NodeChange[]) => {
				const flows = get().flows
				if (!flows) return
				const activeFlow = get().activeFlow || ''
				if (!activeFlow) return
				set({
					flows: {
						...flows,
						[activeFlow]: {
							...flows[activeFlow],
							nodes: applyNodeChanges(
								changes,
								flows[activeFlow].nodes as unknown as Node[]
							) as CustomNode[],
						},
					},
				})
				get().refreshActiveNode()
				// We are emitting nodesChange event here to listen this in the parent component and trigger the save flow function
				// to check where the emitted events are consumed search for 'nodesChange' in the codebase
				debounce(emitNodesChange, 5000, {
					maxWait: 1,
				})()
			},
			onEdgesChange: (changes: EdgeChange[]) => {
				const flows = get().flows
				if (!flows) return
				const activeFlow = get().activeFlow || ''
				if (!activeFlow) return
				set({
					flows: {
						...flows,
						[activeFlow]: {
							...flows[activeFlow],
							edges: applyEdgeChanges(changes, flows[activeFlow].edges),
						},
					},
				})
			},
			onConnect: (connection: Connection) => {
				const flows = get().flows
				if (!flows) return
				const activeFlow = get().activeFlow || ''
				if (!activeFlow) return
				set({
					flows: {
						...flows,
						[activeFlow]: {
							...flows[activeFlow],
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
								flows[activeFlow].edges
							),
						},
					},
				})
			},
		}
	})
)
