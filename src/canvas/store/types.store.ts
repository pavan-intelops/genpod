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

interface FlowData {
	flowKey: string
	nodes: CustomNode[]
	edges: CustomEdge[]
	activeNode: CustomNode | null
}
export interface FlowStore {
	flows: {
		[key: string]: FlowData
	} | null
	addFlow: (flowKey: string) => void
	removeFlow: (flowKey: string) => void
	updateFlow: (flowKey: string, flow: FlowData) => void
	activeFlow: string | null
	setActiveFlow: (flowKey: string) => void
	refreshActiveNode: () => void
	setActiveNode: (nodeId: string) => void
	getNodesAndEdges: (flowKey?: string) => {
		nodes: CustomNode[]
		edges: CustomEdge[]
	}
	addNode: (node: CustomNode) => void
	setNodes: (nodes: CustomNode[]) => void
	setEdges: (edges: Edge[]) => void
	setNodeFormData: (nodeFormData: CustomNodeFormData, nodeId?: string) => void
	getNodeFormData: (nodeId: string) => CustomNodeFormData | undefined
	onNodesChange: OnNodesChange
	onEdgesChange: OnEdgesChange
	onConnect: OnConnect
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

export interface ProjectStore {
	projects: {
		[key: string]: CompageJson
	}
	setProjects: (projects: { [key: string]: CompageJson }) => void
	addProject: (projectKey: string, project: CompageJson) => void
	updateProject: (projectKey: string, project: CompageJson) => void
	deleteProject: (projectKey: string) => void
}
