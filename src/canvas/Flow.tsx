import { Box, Button, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCircleArrowUp, IconEyeCode } from '@tabler/icons-react';
import { useCallback } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Panel
} from 'reactflow';
import { useProjectOperations } from 'src/api/useProjectOperations/useProjectOperations';
import AddNodeModal from 'src/components/common/modal/AddNodeModal';
import { Project } from 'src/components/user/projects/types';
import { useProjectStore } from 'src/store/useProjectStore';
import CodeViewDrawer from './drawers/code-view/CodeViewDrawer';
import ClientNode from './nodes/client-node/ClientNode.node';
import DBNode from './nodes/db-node/DBNode.node';
import MicroserviceNode from './nodes/microservice/MicroserviceNode.node';
import { useFlowsStore } from './store/flowstore';
import { CustomEdge, CustomNode, NodeTypes } from './store/types.store';

const nodeTypes = {
  [NodeTypes.MICROSERVICE]: MicroserviceNode,
  [NodeTypes.DB_NODE]: DBNode,
  [NodeTypes.CLIENT_NODE]: ClientNode
};

interface ConvertFlowDataToProjectProps {
  nodes: CustomNode[];
  edges: CustomEdge[];
  project: Project;
}
const convertFlowDataToProject = ({
  edges,
  nodes,
  project
}: ConvertFlowDataToProjectProps) => {
  const json = {
    nodes: {} as Record<string, CustomNode>,
    edges: {} as Record<string, CustomEdge>
  };
  nodes.forEach(node => {
    json.nodes[node.id] = {
      id: node.id,
      type: node.type,
      position: node.position,
      data: node.data
    };
  });
  edges.forEach(edge => {
    json.edges[edge.id] = {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: edge.type,
      data: edge.data
    };
  });
  return {
    ...project,
    json
  };
};

// interface FlowProps extends Partial<ReactFlowProps> {}
export default function Flow() {
  const {
    onNodesChange,
    onEdgesChange,
    onConnect,
    getNodesAndEdges,
    flows,
    activeFlow
  } = useFlowsStore();
  const { nodes, edges } = getNodesAndEdges();
  const [
    isCodeViewDrawerOpen,
    { close: closeCodeViewDrawer, open: openCodeViewDrawer }
  ] = useDisclosure(false);
  const projects = useProjectStore(state => state.projects);
  const { updateProject } = useProjectOperations();
  const handleViewCodeClick = () => {
    openCodeViewDrawer();
  };
  const getFlow = useCallback(() => {
    if (!flows || !activeFlow) return;
    return flows[activeFlow];
  }, [flows, activeFlow]);

  const handleSyncClick = async () => {
    const currentFlow = getFlow();
    if (!currentFlow) {
      console.error('No flow found');
      return;
    }

    const projectDetails = projects.find(
      project => project.id === activeFlow?.slice(4)
    );

    if (!projectDetails || !activeFlow) {
      console.error({
        projectDetails,
        activeFlow
      });
      return;
    }
    const formattedProject = convertFlowDataToProject({
      ...projectDetails,
      nodes: currentFlow.nodes,
      edges: currentFlow.edges,
      project: {
        ...projectDetails
      }
    });
    updateProject(activeFlow!.slice(4), formattedProject);
  };
  return (
    <>
      <Box w="100%" h="100%">
        <ReactFlow
          proOptions={{
            hideAttribution: true
          }}
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Panel position="top-left">
            <AddNodeModal
              type={NodeTypes.MICROSERVICE}
              buttonText="Add Microservice Node"
              mx="sm"
            />
            {/* <AddNodeModal
              type={NodeTypes.DB_NODE}
              buttonText="Add DB Node"
              mx="sm"
            /> */}
            {/* <AddNodeModal
              type={NodeTypes.CLIENT_NODE}
              buttonText="Add Client Node"
              mx="sm"
            /> */}
            <Button
              bg="blue.4"
              ml="sm"
              leftSection={<IconEyeCode />}
              onClick={handleViewCodeClick}
            >
              View Generated Config
            </Button>
            <Button
              bg="blue.4"
              ml="sm"
              leftSection={<IconCircleArrowUp />}
              onClick={handleSyncClick}
            >
              Sync Code
            </Button>
          </Panel>
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </Box>
      <Drawer
        size="xl"
        position="right"
        onClose={closeCodeViewDrawer}
        opened={isCodeViewDrawerOpen}
        closeOnEscape={false}
      >
        <CodeViewDrawer />
      </Drawer>
    </>
  );
}
