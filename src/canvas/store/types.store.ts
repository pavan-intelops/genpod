import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow'

export enum NodeTypes {
	MICROSERVICE = 'microservice',
	NESTED_MICROSERVICE_NODE = 'nested-microservice-node',
	DB_NODE = 'db-node',
	CLIENT_NODE = 'client-node',
}
export type MicroServiceNodeFormData = {
	name: string
	description: string
	type: NodeTypes.MICROSERVICE
}
export type DBNodeFormData = {
	name: string
	description: string

	type: NodeTypes.DB_NODE
}
export type ClientNodeFormData = {
	name: string
	description: string
	type: NodeTypes.CLIENT_NODE
}
export type MicroServiceNode = Node<
	MicroServiceNodeFormData,
	NodeTypes.MICROSERVICE
>
export type DBNode = Node<DBNodeFormData, NodeTypes.DB_NODE>
export type ClientNode = Node<ClientNodeFormData, NodeTypes.CLIENT_NODE>

export type CustomNode = ClientNode | MicroServiceNode | DBNode
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
	getNodeFormData: (nodeId: string) => CustomNode | undefined
	onNodesChange: OnNodesChange
	onEdgesChange: OnEdgesChange
	onConnect: OnConnect
	isNodeEditDrawerOpen: boolean
	toggleNodeEditDrawer: () => void
}
