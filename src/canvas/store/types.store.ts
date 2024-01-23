import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow'
import { MicroServiceNodeFormData } from '../nodes/microservice/MicroserviceNode.types'
import { DBNodeFormData } from '../nodes/db-node/DBNode.types'
import { ClientNodeFormData } from '../nodes/client-node/ClientNode.types'

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

export interface FlowStore {
	flowKey: string
	nodes: CustomNode[]
	edges: Edge[]
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
