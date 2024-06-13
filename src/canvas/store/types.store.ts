import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow';
import { ClientNodeFormData } from '../nodes/client-node/ClientNode.types';
import { DBNodeFormData } from '../nodes/db-node/DBNode.types';
import { MicroServiceNodeData } from '../nodes/microservice/MicroserviceNode.types';

export enum NodeTypes {
  MICROSERVICE = 'microservice',
  NESTED_MICROSERVICE_NODE = 'nested-microservice-node',
  DB_NODE = 'db-node',
  CLIENT_NODE = 'client-node'
}

export enum EdgeTypes {
  CUSTOM_EDGE = 'custom-edge'
}

export type MicroServiceNode = Node<MicroServiceNodeData, NodeTypes>;
export type DBNode = Node<DBNodeFormData, NodeTypes>;
export type ClientNode = Node<ClientNodeFormData, NodeTypes>;

export type CustomNode = MicroServiceNode | DBNode | ClientNode;
export type CustomNodeFormData =
  | MicroServiceNodeData
  | DBNodeFormData
  | ClientNodeFormData;

export type CustomEdge = Edge;
export type CustomEdgeFormData = {
  name: string;
  requirements: string;
};
export interface License {
  id: string;
  type: 'file' | 'link' | 'path';
  value: string | File;
  tag: string;
}
interface FlowData {
  flowKey: string;
  nodes: CustomNode[];
  edges: CustomEdge[];
  activeNode: CustomNode | null;
  activeEdge: CustomEdge | null;
  licenses: License[];
}
export interface FlowStore {
  flows: {
    [key: string]: FlowData;
  } | null;
  addFlow: (flowKey: string) => void;
  removeFlow: (flowKey: string) => void;
  updateFlow: (flowKey: string, flow: FlowData) => void;
  updateLicenses: (flowKey: string, licenses: License[]) => License[];
  activeFlow: string | null;
  getActiveFlow: () => FlowData | null;
  setActiveFlow: (flowKey: string) => void;
  refreshActiveNode: () => void;
  refreshActiveEdge: () => void;
  setActiveNode: (nodeId: string) => void;
  setActiveEdge: (edgeId: string) => void;
  getNodesAndEdges: (flowKey?: string) => {
    nodes: CustomNode[];
    edges: CustomEdge[];
  };
  setNodeFormData: (nodeFormData: CustomNodeFormData, nodeId?: string) => void;
  getNodeFormData: (nodeId: string) => CustomNodeFormData | undefined;

  setEdgeFormData: (edgeFormData: CustomEdgeFormData, edgeId?: string) => void;
  getEdgeFormData: (edgeId: string) => CustomEdgeFormData | undefined;

  // The below functions are required for the react-flow to function
  addNode: (node: CustomNode) => void;
  setNodes: (nodes: CustomNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
}
export type NodeConsumerData = MicroServiceNodeData;
