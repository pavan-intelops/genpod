import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow'
import { ClientNodeFormData } from '../nodes/client-node/ClientNode.types'
import { DBNodeFormData } from '../nodes/db-node/DBNode.types'
import { MicroServiceNodeFormData } from '../nodes/microservice/MicroserviceNode.types'

export enum NodeTypes {
	MICROSERVICE = 'microservice',
	NESTED_MICROSERVICE_NODE = 'nested-microservice-node',
	DB_NODE = 'db-node',
	CLIENT_NODE = 'client-node',
}

export type MicroServiceNode = Node<MicroServiceNodeFormData, NodeTypes>
export type DBNode = Node<DBNodeFormData, NodeTypes>
export type ClientNode = Node<ClientNodeFormData, NodeTypes>

export type CustomNode = MicroServiceNode | DBNode | ClientNode
export type CustomNodeFormData =
	| MicroServiceNodeFormData
	| DBNodeFormData
	| ClientNodeFormData

export type CustomEdge = Edge

export interface FlowStore {
	flowKey: string
	nodes: CustomNode[]
	edges: CustomEdge[]
	activeNode: CustomNode | null
	refreshActiveNode: () => void
	setActiveNode: (nodeId: string) => void
	addNode: (node: CustomNode) => void
	setNodes: (nodes: CustomNode[]) => void
	setEdges: (edges: Edge[]) => void
	setNodeFormData: (nodeFormData: CustomNodeFormData, nodeId?: string) => void
	getNodeFormData: (nodeId: string) => CustomNodeFormData | undefined
	onNodesChange: OnNodesChange
	onEdgesChange: OnEdgesChange
	onConnect: OnConnect
	isNodeEditDrawerOpen: boolean
	toggleNodeEditDrawer: () => void
}
export type NodeConsumerData = MicroServiceNodeFormData
export interface CompageJson {
	edges: Record<string, CustomEdge>
	nodes: Record<string, CustomNode>
	version?: string
	workspace?: unknown
	undoHistory?: unknown
	potentialNode?: unknown
	potentialEdge?: unknown
	plugins?: unknown
	panels?: unknown
	editor?: unknown
}
